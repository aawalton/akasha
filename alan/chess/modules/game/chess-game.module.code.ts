import type { PositionStatus } from "akasha/alan/chess/modules/position/chess-position.module.code.ts"

export const STANDARD_START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

export type PlayerColor = "white" | "black"
export type Winner = PlayerColor | "draw"
export type Outcome = "win" | "loss" | "draw"
export type GameEndReason = "checkmate" | "stalemate" | "fifty-move" | "threefold" | "resignation"

export interface GamePly {
  readonly moveUci: string
  readonly color: PlayerColor
  readonly fenAfter: string
}

export interface TerminalVerdict {
  readonly reason: GameEndReason
  readonly winner: Winner
}

export function positionKey(fen: string): string {
  return fen.trim().split(/\s+/).slice(0, 4).join(" ")
}

function halfmoveClock(fen: string): number {
  const field = fen.trim().split(/\s+/)[4]
  if (field === undefined) {
    return 0
  }
  const n = Number(field)
  return Number.isFinite(n) ? n : 0
}

function isFiftyMove(fen: string): boolean {
  return halfmoveClock(fen) >= 100
}

function repetitionCount(keys: readonly string[], key: string): number {
  let count = 0
  for (const k of keys) {
    if (k === key) {
      count += 1
    }
  }
  return count
}

function opponentOf(color: PlayerColor): PlayerColor {
  return color === "white" ? "black" : "white"
}

export function outcomeFor(winner: Winner, alanColor: PlayerColor): Outcome {
  if (winner === "draw") {
    return "draw"
  }
  return winner === alanColor ? "win" : "loss"
}

export function detectTerminal(args: {
  readonly status: PositionStatus
  readonly moverColor: PlayerColor
  readonly fenAfter: string
  readonly positionKeys: readonly string[]
}): TerminalVerdict | null {
  if (args.status === "checkmate") {
    return { reason: "checkmate", winner: args.moverColor }
  }
  if (args.status === "stalemate") {
    return { reason: "stalemate", winner: "draw" }
  }
  if (isFiftyMove(args.fenAfter)) {
    return { reason: "fifty-move", winner: "draw" }
  }
  if (repetitionCount(args.positionKeys, positionKey(args.fenAfter)) >= 3) {
    return { reason: "threefold", winner: "draw" }
  }
  return null
}

export function resignationVerdict(resigningColor: PlayerColor): TerminalVerdict {
  return { reason: "resignation", winner: opponentOf(resigningColor) }
}
