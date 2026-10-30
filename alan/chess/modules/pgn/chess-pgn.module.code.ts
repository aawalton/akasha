import {
  type GamePly,
  STANDARD_START_FEN,
  type Winner,
} from "akasha/alan/chess/modules/game/chess-game.module.code.ts"
import { fenSideToMove } from "akasha/alan/chess/modules/uci/chess-uci.module.code.ts"

function fullmoveNumber(fen: string): number {
  const field = fen.trim().split(/\s+/)[5]
  if (field === undefined) {
    return 1
  }
  const n = Number(field)
  return Number.isInteger(n) && n >= 1 ? n : 1
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

interface PgnHeaders {
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
