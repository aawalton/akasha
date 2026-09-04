import type { PositionStatus } from "../position/chess-position.module.code.ts"
import { fenSideToMove } from "../uci/chess-uci.module.code.ts"

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

export function halfmoveClock(fen: string): number {
  const field = fen.trim().split(/\s+/)[4]
  if (field === undefined) {
    return 0
  }
  const n = Number(field)
  return Number.isFinite(n) ? n : 0
}

function fullmoveNumber(fen: string): number {
  const field = fen.trim().split(/\s+/)[5]
  if (field === undefined) {
    return 1
  }
  const n = Number(field)
  return Number.isInteger(n) && n >= 1 ? n : 1
}

export function isFiftyMove(fen: string): boolean {
  return halfmoveClock(fen) >= 100
}

export function repetitionCount(keys: readonly string[], key: string): number {
  let count = 0
  for (const k of keys) {
    if (k === key) {
      count += 1
    }
  }
  return count
}

export function opponentOf(color: PlayerColor): PlayerColor {
  return color === "white" ? "black" : "white"
}

export function winnerToResult(winner: Winner): string {
  if (winner === "white") {
    return "1-0"
  }
  if (winner === "black") {
    return "0-1"
  }
  return "1/2-1/2"
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

export interface PgnHeaders {
  readonly event: string
  readonly site: string
  readonly date: string
  readonly white: string
  readonly black: string
  readonly result: string
}

function buildMovetext(startFen: string, plies: readonly GamePly[]): string {
  const parts: string[] = []
  let num = fullmoveNumber(startFen)
  let expectWhite = fenSideToMove(startFen) === "w"
  for (const ply of plies) {
    if (expectWhite) {
      parts.push(`${num}. ${ply.moveUci}`)
    } else {
      parts.push(parts.length === 0 ? `${num}... ${ply.moveUci}` : ply.moveUci)
      num += 1
    }
    expectWhite = !expectWhite
  }
  return parts.join(" ")
}

export function buildPgn(args: {
  readonly startFen: string
  readonly plies: readonly GamePly[]
  readonly headers: PgnHeaders
}): string {
  const { headers } = args
  const tags = [
    `[Event "${headers.event}"]`,
    `[Site "${headers.site}"]`,
    `[Date "${headers.date}"]`,
    `[Round "-"]`,
    `[White "${headers.white}"]`,
    `[Black "${headers.black}"]`,
    `[Result "${headers.result}"]`,
  ]
  if (args.startFen !== STANDARD_START_FEN) {
    tags.push(`[SetUp "1"]`, `[FEN "${args.startFen}"]`)
  }
  const movetext = buildMovetext(args.startFen, args.plies)
  const body = movetext.length > 0 ? `${movetext} ${headers.result}` : headers.result
  return `${tags.join("\n")}\n\n${body}\n`
}
