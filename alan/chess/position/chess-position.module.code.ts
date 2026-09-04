import { InputError } from "@akasha/errors-core/exit-code"
import { runEngine } from "../engine/chess-engine.module.code.ts"
import {
  fenSideToMove,
  isBestMoveLine,
  parseCheckers,
  parseDisplayedFen,
  parsePerftMoves,
  parseSearch,
  type ScoreInfo,
} from "../uci/chess-uci.module.code.ts"

function isPerftDoneLine(line: string): boolean {
  return line.trim().startsWith("Nodes searched")
}

export const SKILL_MIN = 0
export const SKILL_MAX = 20
export const ELO_MIN = 1320
export const ELO_MAX = 3190

export async function legalMoves(fen: string): Promise<readonly string[]> {
  const lines = await runEngine({
    commands: [`position fen ${fen}`, "go perft 1"],
    until: isPerftDoneLine,
  })
  return parsePerftMoves(lines)
}

export type PositionStatus = "ongoing" | "check" | "checkmate" | "stalemate"

export interface EvaluateResult {
  readonly fen: string
  readonly sideToMove: "w" | "b"
  readonly scoreKind: ScoreInfo["kind"]
  readonly score: number
  readonly scoreWhitePov: number
  readonly depth: number
  readonly bestMove: string | null
  readonly pv: readonly string[]
}

export async function evaluate(fen: string, depth: number): Promise<EvaluateResult> {
  const lines = await runEngine({
    commands: [`position fen ${fen}`, `go depth ${depth}`],
    until: isBestMoveLine,
  })
  const search = parseSearch(lines)
  const side = fenSideToMove(fen)
  const whitePov = side === "w" ? search.value : -search.value
  return {
    fen,
    sideToMove: side,
    scoreKind: search.kind,
    score: search.value,
    scoreWhitePov: whitePov,
    depth: search.depth,
    bestMove: search.bestMove,
    pv: search.pv,
  }
}

export function classifyStatus(moveCount: number, inCheck: boolean): PositionStatus {
  if (moveCount === 0) {
    return inCheck ? "checkmate" : "stalemate"
  }
  return inCheck ? "check" : "ongoing"
}

export interface ApplyMoveResult {
  readonly fen: string
  readonly status: PositionStatus
  readonly sideToMove: "w" | "b"
  readonly checkers: readonly string[]
  readonly legalMoveCount: number
}

export async function applyMove(fen: string, move: string): Promise<ApplyMoveResult> {
  const legal = await legalMoves(fen)
  if (!legal.includes(move)) {
    throw new InputError(`illegal move "${move}" in position "${fen}"`)
  }
  const lines = await runEngine({
    commands: [`position fen ${fen} moves ${move}`, "d", "go perft 1"],
    until: isPerftDoneLine,
  })
  const newFen = parseDisplayedFen(lines)
  if (newFen === null) {
    throw new InputError(`engine did not report a resulting position for move "${move}"`)
  }
  const checkers = parseCheckers(lines)
  const moves = parsePerftMoves(lines)
  return {
    fen: newFen,
    status: classifyStatus(moves.length, checkers.length > 0),
    sideToMove: fenSideToMove(newFen),
    checkers,
    legalMoveCount: moves.length,
  }
}

export interface PlayStrength {
  readonly level?: number
  readonly elo?: number
  readonly movetimeMs?: number
}

export interface PlayResult {
  readonly move: string | null
  readonly resultingFen: string | null
  readonly status: PositionStatus | null
  readonly strength: { readonly mode: "level" | "elo"; readonly value: number }
}

export function strengthOptions(strength: PlayStrength): {
  readonly options: readonly string[]
  readonly mode: "level" | "elo"
  readonly value: number
} {
  if (strength.level !== undefined && strength.elo !== undefined) {
    throw new InputError("specify either --level or --elo, not both")
  }
  if (strength.elo !== undefined) {
    if (!Number.isInteger(strength.elo) || strength.elo < ELO_MIN || strength.elo > ELO_MAX) {
      throw new InputError(`--elo must be an integer in [${ELO_MIN}, ${ELO_MAX}]`)
    }
    return {
      options: [
        "setoption name UCI_LimitStrength value true",
        `setoption name UCI_Elo value ${strength.elo}`,
      ],
      mode: "elo",
      value: strength.elo,
    }
  }
  const level = strength.level ?? SKILL_MAX
  if (!Number.isInteger(level) || level < SKILL_MIN || level > SKILL_MAX) {
    throw new InputError(`--level must be an integer in [${SKILL_MIN}, ${SKILL_MAX}]`)
  }
  return {
    options: [`setoption name Skill Level value ${level}`],
    mode: "level",
    value: level,
  }
}

export async function playMove(fen: string, strength: PlayStrength): Promise<PlayResult> {
  const { options, mode, value } = strengthOptions(strength)
  const movetime = strength.movetimeMs ?? 1000
  if (!Number.isInteger(movetime) || movetime <= 0) {
    throw new InputError("--movetime must be a positive integer (ms)")
  }
  const lines = await runEngine({
    options,
    commands: [`position fen ${fen}`, `go movetime ${movetime}`],
    until: isBestMoveLine,
    timeoutMs: movetime + 10_000,
  })
  const search = parseSearch(lines)
  if (search.bestMove === null) {
    return { move: null, resultingFen: null, status: null, strength: { mode, value } }
  }
  const applied = await applyMove(fen, search.bestMove)
  return {
    move: search.bestMove,
    resultingFen: applied.fen,
    status: applied.status,
    strength: { mode, value },
  }
}
