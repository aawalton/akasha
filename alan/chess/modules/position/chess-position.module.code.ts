import { runEngine } from "akasha/alan/chess/modules/engine/chess-engine.module.code.ts"
import {
  fenSideToMove,
  isBestMoveLine,
  parseCheckers,
  parseDisplayedFen,
  parsePerftMoves,
  parseSearch,
  type ScoreInfo,
} from "akasha/alan/chess/modules/uci/chess-uci.module.code.ts"
import { InputError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"

function isPerftDoneLine(line: string): boolean {
  return line.trim().startsWith("Nodes searched")
}

async function legalMoves(fen: string): Promise<readonly string[]> {
  const lines = await runEngine({
    commands: [`position fen ${fen}`, "go perft 1"],
    until: isPerftDoneLine,
  })
  return parsePerftMoves(lines)
}

export type PositionStatus = "ongoing" | "check" | "checkmate" | "stalemate"

interface EvaluateResult {
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

function classifyStatus(moveCount: number, inCheck: boolean): PositionStatus {
  if (moveCount === 0) {
    return inCheck ? "checkmate" : "stalemate"
  }
  return inCheck ? "check" : "ongoing"
}

interface ApplyMoveResult {
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
