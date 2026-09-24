import { expect, test } from "bun:test"
import type { AppliedMove } from "akasha/alan/chess/modules/game-loop/chess-game-loop.module.code.ts"
import type { Playing } from "akasha/command/pages/chess/play/chess-play.command.code.ts"
import { playing } from "akasha/command/pages/chess/play/chess-play.command.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { z } from "zod"

const CALLED = "akasha chess play"

const ENVELOPE_SAID = z.strictObject({
  slug: z.string(),
  band: z.number(),
  color: z.string(),
  result: z.string(),
  winner: z.string().nullable(),
  outcome: z.string(),
  endReason: z.string(),
  ply: z.number(),
  wrote: z.array(z.string()),
})

const PLAYED_AT = "2026-09-14T00:00:00.000Z"

const SLUG = `maia-game-${new Date(PLAYED_AT).getTime()}`

const WROTE = "alan/chess/game/pages/one/one.chess-game.ts"

const MOVES = ["f2f3", "e7e5", "g2g4", "d8h4"]

const STATUSES: readonly AppliedMove["status"][] = ["ongoing", "ongoing", "ongoing", "checkmate"]

type Kept = {
  readonly asked: string[]
  readonly played: string[]
  readonly bands: number[]
  readonly named: Naming[]
  readonly messages: string[]
}

type Fake = {
  readonly ports: Playing
  readonly kept: Kept
}

function fakeFor(over: Partial<Playing> = {}): Fake {
  const kept: Kept = { asked: [], played: [], bands: [], named: [], messages: [] }
  let ply = 0
  const moved = (fen: string): Promise<string | null> => {
    kept.asked.push(fen)
    return Promise.resolve(MOVES[ply] ?? null)
  }
  const ports: Playing = {
    maiaAvailable: () => true,
    alanMove: moved,
    maiaMove: (fen, band) => {
      kept.bands.push(band)
      return moved(fen)
    },
    applyMove: (fen, move) => {
      kept.played.push(`${fen} ${move}`)
      const status = STATUSES[ply] ?? "ongoing"
      ply += 1
      const side = ply % 2 === 0 ? "w" : "b"
      return Promise.resolve({ fen: `board${ply} ${side} - - 0 ${ply}`, status, sideToMove: side })
    },
    playedAt: () => PLAYED_AT,
    writing: (_done, named, message) => {
      kept.named.push(named)
      kept.messages.push(message)
      return Promise.resolve({ landed: [WROTE], wrong: [] })
    },
    ...over,
  }
  return { ports, kept }
}

test("a game played out lands as a page carrying how that game went", async () => {
  const fake = fakeFor()
  const said = await playing([], fake.ports, CALLED)
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(fake.kept.played.length).toBe(MOVES.length)
  const named = fake.kept.named[0]
  expect(named?.pageTypeSlug).toBe("chess-game")
  expect(named?.slug).toBe(SLUG)
  expect(named?.values["white"]).toBe("Alan")
  expect(named?.values["black"]).toBe("Maia 1500")
  expect(named?.values["result"]).toBe("0-1")
  expect(named?.values["winner"]).toBe("black")
  expect(named?.values["outcome"]).toBe("loss")
  expect(named?.values["playerColor"]).toBe("white")
  expect(named?.values["ply"]).toBe(MOVES.length)
  expect(named?.values["playedAt"]).toBe(PLAYED_AT)
  expect(said.report.join("\n")).toContain(`wrote ${WROTE}`)
})

test("the moves of a game land in a file beside the page rather than in the page", async () => {
  const fake = fakeFor()
  await playing([], fake.ports, CALLED)
  const named = fake.kept.named[0]
  expect(named?.values["pgn"]).toBe("pgn")
  expect(named?.bodies?.["pgn"]).toContain("f2f3")
  expect(named?.bodies?.["pgn"]).toContain(`[Result "0-1"]`)
})

test("a band no Maia is held for refuses the call before a move is played", async () => {
  const fake = fakeFor({ maiaAvailable: () => false })
  const said = await playing(["--band", "1900"], fake.ports, CALLED)
  expect(said.code).toBe(3)
  expect(said.refusals.join(" ")).toContain("no Maia plays at 1900 here")
  expect(fake.kept.asked).toEqual([])
  expect(fake.kept.named).toEqual([])
})

test("a side naming neither white nor black refuses the call", async () => {
  const fake = fakeFor()
  const said = await playing(["--color", "purple"], fake.ports, CALLED)
  expect(said.code).toBe(1)
  expect(said.refusals.join(" ")).toContain("`--color` takes `white` or `black`")
  expect(fake.kept.asked).toEqual([])
})

test("the side named on the call is the side Alan sits on", async () => {
  const fake = fakeFor()
  const said = await playing(["--color", "black"], fake.ports, CALLED)
  expect(said.code).toBe(0)
  const named = fake.kept.named[0]
  expect(named?.values["white"]).toBe("Maia 1500")
  expect(named?.values["black"]).toBe("Alan")
  expect(named?.values["playerColor"]).toBe("black")
  expect(named?.values["outcome"]).toBe("win")
})

test("the band named on the call is the band the model plays at", async () => {
  const fake = fakeFor()
  await playing(["--band", "1100"], fake.ports, CALLED)
  expect(fake.kept.bands).toEqual([1100, 1100])
  expect(fake.kept.named[0]?.values["black"]).toBe("Maia 1100")
})

test("a side answering no move resigns and the other side wins", async () => {
  const fake = fakeFor({ alanMove: () => Promise.resolve(null) })
  const said = await playing([], fake.ports, CALLED)
  expect(said.code).toBe(0)
  expect(fake.kept.played).toEqual([])
  const named = fake.kept.named[0]
  expect(named?.values["ply"]).toBe(0)
  expect(named?.values["winner"]).toBe("black")
  expect(named?.values["outcome"]).toBe("loss")
})

test("a position named on the call is the position the game opens from", async () => {
  const fake = fakeFor()
  await playing(["--fen", "8/8/8/8/8/8/8/8 w - - 0 1"], fake.ports, CALLED)
  expect(fake.kept.asked[0]).toBe("8/8/8/8/8/8/8/8 w - - 0 1")
  expect(fake.kept.named[0]?.bodies?.["pgn"]).toContain(`[FEN "8/8/8/8/8/8/8/8 w - - 0 1"]`)
})

test("the json answer carries how the game went and what was written", async () => {
  const fake = fakeFor()
  const said = await playing(["--json"], fake.ports, CALLED)
  expect(said.code).toBe(0)
  expect(ENVELOPE_SAID.parse(JSON.parse(said.report.join("\n")))).toEqual({
    slug: SLUG,
    band: 1500,
    color: "white",
    result: "0-1",
    winner: "black",
    outcome: "loss",
    endReason: "checkmate",
    ply: MOVES.length,
    wrote: [WROTE],
  })
})

test("a flag the command does not carry refuses the call", async () => {
  const fake = fakeFor()
  const said = await playing(["--depth"], fake.ports, CALLED)
  expect(said.code).toBe(1)
  expect(said.refusals.join(" ")).toContain(`\`--depth\` is no argument \`${CALLED}\` takes`)
})

test("a write that refuses says the game had been played out", async () => {
  const fake = fakeFor({
    writing: () => Promise.resolve({ refused: "the page could not be composed", code: 2 }),
  })
  const said = await playing([], fake.ports, CALLED)
  expect(said.code).toBe(2)
  expect(said.refusals.join(" ")).toContain("the page could not be composed")
  expect(said.report.join(" ")).toContain("4 moves were played, ending in checkmate")
})
