import { expect, test } from "bun:test"
import type {
  IngestArgs,
  ParsedPuzzle,
} from "akasha/alan/chess/modules/puzzle-lichess/chess-puzzle-lichess.module.code.ts"
import type { Importing } from "akasha/command/pages/chess/puzzles/import/chess-puzzles-import.command.code.ts"
import { importing } from "akasha/command/pages/chess/puzzles/import/chess-puzzles-import.command.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { z } from "zod"

const CALLED = "akasha chess puzzles import"

const ENVELOPE_SAID = z.strictObject({
  slug: z.string(),
  read: z.number(),
  skipped: z.number(),
  matched: z.number(),
  written: z.number(),
  wrote: z.array(z.string()),
})

const WROTE = "alan/chess/puzzle-set/pages/one/one.chess-puzzle-set.ts"

const ONE: ParsedPuzzle = {
  puzzleId: "00008",
  fen: "r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2R1/PqP2bPP/7K b - - 0 24",
  moves: ["f2g3", "e6e7"],
  rating: 1939,
  ratingDeviation: 77,
  popularity: 95,
  nbPlays: 10000,
  themes: ["crushing", "middlegame"],
  gameUrl: "https://lichess.org/787zsVup/black#48",
  openingTags: [],
}

const TWO: ParsedPuzzle = {
  ...ONE,
  puzzleId: "0000D",
  fen: "5rk1/1p3ppp/pq3b2/8/8/1P1Q1N2/P4PPP/3R2K1 w - - 2 27",
  openingTags: ["Sicilian_Defense"],
}

type Kept = {
  readonly args: IngestArgs[]
  readonly named: Naming[]
  readonly messages: string[]
}

type Fake = {
  readonly ports: Importing
  readonly kept: Kept
}

function fakeFor(over: Partial<Importing> = {}): Fake {
  const kept: Kept = { args: [], named: [], messages: [] }
  let minted = 0
  const ports: Importing = {
    ingest: (args, batched) => {
      kept.args.push(args)
      batched([ONE])
      batched([TWO])
      return Promise.resolve({ read: 3, skipped: 1, matched: 2, written: 2 })
    },
    mintId: () => {
      minted += 1
      return `id-${minted}`
    },
    writing: (_done, named, message) => {
      kept.named.push(named)
      kept.messages.push(message)
      return Promise.resolve({ landed: [WROTE], wrong: [] })
    },
    ...over,
  }
  return { ports, kept }
}

function rowsIn(named: Naming | undefined): readonly Value[] {
  const held = named?.values["puzzles"]
  return Array.isArray(held) ? (held as readonly Value[]) : []
}

test("every puzzle a batch carries becomes a row of the set", async () => {
  const fake = fakeFor()
  const said = await importing([], fake.ports, CALLED)
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  const named = fake.kept.named[0]
  expect(named?.pageTypeSlug).toBe("chess-puzzle-set")
  expect(named?.slug).toBe("lichess")
  expect(named?.values["title"]).toBe("Lichess")
  const rows = rowsIn(named)
  expect(rows.length).toBe(2)
  expect(rows[0]?.["puzzleId"]).toBe("00008")
  expect(rows[0]?.["moves"]).toBe("f2g3 e6e7")
  expect(rows[0]?.["solverColor"]).toBe("white")
  expect(rows[0]?.["license"]).toBe("CC0-1.0")
  expect(rows[1]?.["puzzleId"]).toBe("0000D")
  expect(rows[1]?.["solverColor"]).toBe("black")
  expect(rows[1]?.["openingTags"]).toEqual(["Sicilian_Defense"])
})

test("a row carries an id minted when that row is written", async () => {
  const fake = fakeFor()
  await importing([], fake.ports, CALLED)
  const rows = rowsIn(fake.kept.named[0])
  expect(rows[0]?.["id"]).toBe("id-1")
  expect(rows[1]?.["id"]).toBe("id-2")
})

test("a puzzle nobody has answered is written with no answer", async () => {
  const fake = fakeFor()
  await importing([], fake.ports, CALLED)
  const rows = rowsIn(fake.kept.named[0])
  expect("solved" in (rows[0] ?? {})).toBe(false)
})

test("a limit named on the call is the limit the reading takes", async () => {
  const fake = fakeFor()
  await importing(["--limit", "5"], fake.ports, CALLED)
  expect(fake.kept.args).toEqual([{ limit: 5 }])
})

test("a call naming no limit hands the reading none", async () => {
  const fake = fakeFor()
  await importing([], fake.ports, CALLED)
  expect(fake.kept.args).toEqual([{}])
})

test("a limit under one refuses the call before anything is read", async () => {
  const fake = fakeFor()
  const said = await importing(["--limit", "0"], fake.ports, CALLED)
  expect(said.code).toBe(1)
  expect(said.refusals.join(" ")).toContain("`--limit` takes a whole number of one or more")
  expect(fake.kept.args).toEqual([])
})

test("the answer counts what was read, skipped, matched and written", async () => {
  const fake = fakeFor()
  const said = await importing([], fake.ports, CALLED)
  expect(said.report.join("\n")).toContain("read\t3")
  expect(said.report.join("\n")).toContain("skipped\t1")
  expect(said.report.join("\n")).toContain("matched\t2")
  expect(said.report.join("\n")).toContain("written\t2")
  expect(said.report.join("\n")).toContain(`wrote ${WROTE}`)
})

test("the json answer carries the counts and what was written", async () => {
  const fake = fakeFor()
  const said = await importing(["--json"], fake.ports, CALLED)
  expect(said.code).toBe(0)
  expect(ENVELOPE_SAID.parse(JSON.parse(said.report.join("\n")))).toEqual({
    slug: "lichess",
    read: 3,
    skipped: 1,
    matched: 2,
    written: 2,
    wrote: [WROTE],
  })
})

test("a flag the command does not carry refuses the call", async () => {
  const fake = fakeFor()
  const said = await importing(["--themes"], fake.ports, CALLED)
  expect(said.code).toBe(1)
  expect(said.refusals.join(" ")).toContain(`\`--themes\` is no argument \`${CALLED}\` takes`)
})

test("a write that refuses says how much had been read", async () => {
  const fake = fakeFor({
    writing: () => Promise.resolve({ refused: "the set could not be composed", code: 2 }),
  })
  const said = await importing([], fake.ports, CALLED)
  expect(said.code).toBe(2)
  expect(said.refusals.join(" ")).toContain("the set could not be composed")
  expect(said.report.join(" ")).toContain("2 puzzles were taken off the database")
})
