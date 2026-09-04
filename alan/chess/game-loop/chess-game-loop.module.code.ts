import {
  buildPgn,
  detectTerminal,
  type GameEndReason,
  type GamePly,
  type Outcome,
  outcomeFor,
  type PlayerColor,
  positionKey,
  resignationVerdict,
  type TerminalVerdict,
  type Winner,
  winnerToResult,
} from "../game/chess-game.module.code.ts"
import type { PositionStatus } from "../position/chess-position.module.code.ts"
import { fenSideToMove } from "../uci/chess-uci.module.code.ts"

export interface AppliedMove {
  readonly fen: string
  readonly status: PositionStatus
  readonly sideToMove: "w" | "b"
}

export interface GameLoopDeps {
  readonly readAlanMove: (fen: string) => Promise<string | null>
  readonly maiaMove: (fen: string) => Promise<string | null>
  readonly applyMove: (fen: string, move: string) => Promise<AppliedMove>
}

export interface RunGameArgs {
  readonly startFen: string
  readonly alanColor: PlayerColor
  readonly band: number
  readonly playedAt: string
  readonly deps: GameLoopDeps
}

export interface CompletedGame {
  readonly startFen: string
  readonly plies: readonly GamePly[]
  readonly winner: Winner
  readonly result: string
  readonly endReason: GameEndReason
  readonly alanColor: PlayerColor
  readonly outcome: Outcome
  readonly band: number
  readonly playedAt: string
  readonly white: string
  readonly black: string
  readonly externalId: string
  readonly pgn: string
}

function seatName(color: PlayerColor, alanColor: PlayerColor, band: number): string {
  return color === alanColor ? "Alan" : `Maia ${band}`
}

export async function runGame(args: RunGameArgs): Promise<CompletedGame> {
  const { startFen, alanColor, band, playedAt, deps } = args
  const white = seatName("white", alanColor, band)
  const black = seatName("black", alanColor, band)

  let fen = startFen
  let side = fenSideToMove(startFen)
  const plies: GamePly[] = []
  const positionKeys: string[] = [positionKey(startFen)]

  let verdict: TerminalVerdict
  for (;;) {
    const turnColor: PlayerColor = side === "w" ? "white" : "black"
    const move = turnColor === alanColor ? await deps.readAlanMove(fen) : await deps.maiaMove(fen)
    if (move === null) {
      verdict = resignationVerdict(turnColor)
      break
    }
    const applied = await deps.applyMove(fen, move)
    plies.push({ moveUci: move, color: turnColor, fenAfter: applied.fen })
    positionKeys.push(positionKey(applied.fen))
    const terminal = detectTerminal({
      status: applied.status,
      moverColor: turnColor,
      fenAfter: applied.fen,
      positionKeys,
    })
    fen = applied.fen
    side = applied.sideToMove
    if (terminal !== null) {
      verdict = terminal
      break
    }
  }

  const result = winnerToResult(verdict.winner)
  const pgn = buildPgn({
    startFen,
    plies,
    headers: {
      event: "Erin sparring vs Maia",
      site: "local",
      date: playedAt.slice(0, 10),
      white,
      black,
      result,
    },
  })
  return {
    startFen,
    plies,
    winner: verdict.winner,
    result,
    endReason: verdict.reason,
    alanColor,
    outcome: outcomeFor(verdict.winner, alanColor),
    band,
    playedAt,
    white,
    black,
    externalId: `maia-game_${new Date(playedAt).getTime()}`,
    pgn,
  }
}
