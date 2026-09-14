import type {
  GameEndReason,
  Outcome,
  PlayerColor,
  Winner,
} from "akasha/alan/chess/modules/game/chess-game.module.code.ts"
import { STANDARD_START_FEN } from "akasha/alan/chess/modules/game/chess-game.module.code.ts"
import type {
  AppliedMove,
  CompletedGame,
} from "akasha/alan/chess/modules/game-loop/chess-game-loop.module.code.ts"
import { runGame } from "akasha/alan/chess/modules/game-loop/chess-game-loop.module.code.ts"
import {
  CHESS_GAME_SLUG,
  chessGameValues,
} from "akasha/alan/chess/modules/game-record/chess-game-record.module.code.ts"
import {
  maiaAvailable,
  playMaiaMove,
} from "akasha/alan/chess/modules/maia/chess-maia.module.code.ts"
import {
  applyMove,
  evaluate,
} from "akasha/alan/chess/modules/position/chess-position.module.code.ts"
import type { Asking } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { landedMechanically } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/taking/argument-taking.module.code.ts"
import { band as bandArgument } from "akasha/commands/arguments/pages/band.argument.ts"
import { color as colorArgument } from "akasha/commands/arguments/pages/color.argument.ts"
import { fen as fenArgument } from "akasha/commands/arguments/pages/fen.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  keeping,
  keyedLines,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { chessPlay as page } from "akasha/commands/pages/chess/play/chess-play.command.ts"
import {
  composedFor,
  type Naming,
  type Put,
} from "akasha/pages/service/modules/page-composing/page-composing.module.code.ts"

const NAMED = [bandArgument, colorArgument, fenArgument, json]

const DEPTH = 12

const PGN = "pgn"

const SLUG = "slug"

const WHITE = "white"

const BLACK = "black"

const PUT = "change-mechanical/add-file-of-any-kind"

const SIDES = `\`${WHITE}\` or \`${BLACK}\``

export type Wrote =
  | { readonly landed: readonly string[]; readonly wrong: readonly string[] }
  | { readonly refused: string; readonly code: number }

export type Writing = (done: string[], named: Naming, message: string) => Promise<Wrote>

function putting(one: Put): Asking {
  return { at: PUT, given: { at: one.path, body: one.content } }
}

function writingIn(root: string): Writing {
  return async (done: string[], named: Naming, message: string): Promise<Wrote> => {
    const composed = composedFor(root, named)
    if ("refused" in composed) return { refused: composed.refused, code: DATA }
    const asked: Asking[] = [putting(composed.put), ...composed.parts.map(putting)]
    const landed = await landedMechanically(done, root, asked, message)
    if ("refusals" in landed) return { refused: landed.refusals.join(" "), code: landed.code }
    return { landed: landed.landed, wrong: landed.wrong }
  }
}

export type Playing = {
  readonly maiaAvailable: (band: number) => boolean
  readonly alanMove: (fen: string) => Promise<string | null>
  readonly maiaMove: (fen: string, band: number) => Promise<string | null>
  readonly applyMove: (fen: string, move: string) => Promise<AppliedMove>
  readonly playedAt: () => string
  readonly writing: Writing
}

async function bestMoveIn(fen: string): Promise<string | null> {
  return (await evaluate(fen, DEPTH)).bestMove
}

const LIVE: Omit<Playing, "writing"> = {
  maiaAvailable,
  alanMove: bestMoveIn,
  maiaMove: playMaiaMove,
  applyMove,
  playedAt: (): string => new Date().toISOString(),
}

export function sideIn(said: string): PlayerColor | null {
  if (said === WHITE || said === BLACK) return said
  return null
}

function sideRefused(said: string): string {
  return `\`${colorArgument.said}\` takes ${SIDES}, and \`${said}\` is neither`
}

function bandRefused(band: number): string {
  return (
    `no Maia plays at ${band} here — lc0 answers on the path and the weights for that band ` +
    `sit in the weights directory before a game is played`
  )
}

export function namedFor(game: CompletedGame): Naming {
  const values = chessGameValues(game)
  const held = values[PGN]
  const slug = values[SLUG]
  return {
    pageTypeSlug: CHESS_GAME_SLUG,
    slug: typeof slug === "string" ? slug : game.externalId,
    values: { ...values, pgn: PGN },
    bodies: { pgn: typeof held === "string" ? held : "" },
  }
}

export type PlayEnvelope = {
  readonly slug: string
  readonly band: number
  readonly color: PlayerColor
  readonly result: string
  readonly winner: Winner
  readonly outcome: Outcome
  readonly endReason: GameEndReason
  readonly ply: number
  readonly wrote: readonly string[]
}

function envelopeFor(game: CompletedGame, slug: string, wrote: readonly string[]): PlayEnvelope {
  return {
    slug,
    band: game.band,
    color: game.alanColor,
    result: game.result,
    winner: game.winner,
    outcome: game.outcome,
    endReason: game.endReason,
    ply: game.plies.length,
    wrote,
  }
}

function linesFor(game: CompletedGame, slug: string, wrote: readonly string[]): readonly string[] {
  return [
    ...keyedLines([
      [SLUG, slug],
      [WHITE, game.white],
      [BLACK, game.black],
      ["result", game.result],
      ["outcome", game.outcome],
      ["end", game.endReason],
      ["ply", game.plies.length],
    ]),
    ...wrote.map((one) => `wrote ${one}`),
  ]
}

function messageOf(game: CompletedGame, slug: string): string {
  return `record the game ${slug}, ${game.white} against ${game.black}`
}

export async function playing(
  argv: readonly string[],
  ports: Playing,
  calledAs: string
): Promise<Answer> {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const taken = read.taken
  const side = sideIn(taken.color)
  if (side === null) return refused(sideRefused(taken.color), INPUT)
  if (!ports.maiaAvailable(taken.band)) {
    return refused(bandRefused(taken.band), OPERATIONAL)
  }
  return await answering(async (done) => {
    const game = await runGame({
      startFen: taken.fen ?? STANDARD_START_FEN,
      alanColor: side,
      band: taken.band,
      playedAt: ports.playedAt(),
      deps: {
        readAlanMove: ports.alanMove,
        maiaMove: (fen: string) => ports.maiaMove(fen, taken.band),
        applyMove: ports.applyMove,
      },
    })
    done.push(`${game.plies.length} moves were played, ending in ${game.endReason}`)
    const named = namedFor(game)
    const wrote = await ports.writing(done, named, messageOf(game, named.slug))
    if ("refused" in wrote) return keeping(done, refused(wrote.refused, wrote.code))
    if (wrote.wrong.length > 0) return keeping(done, refusedBy(wrote.wrong, OPERATIONAL))
    const said = taken.json
      ? [JSON.stringify(envelopeFor(game, named.slug, wrote.landed))]
      : linesFor(game, named.slug, wrote.landed)
    return told(said)
  })
}

export function chessPlay(argv: readonly string[], given: Given): Promise<Answer> {
  return playing(argv, { ...LIVE, writing: writingIn(given.root) }, given.calledAs)
}
