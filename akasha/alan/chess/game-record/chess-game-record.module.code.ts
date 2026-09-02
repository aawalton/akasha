import type { CompletedGame } from "../game-loop/chess-game-loop.module.code.ts"

export const CHESS_GAME_SLUG = "chess-game"

export type ChessGameValue = string | number | boolean

export function chessGamePageName(externalId: string): string {
  return externalId.replace(/_/g, "-")
}

export function chessGameValues(game: CompletedGame): Record<string, ChessGameValue> {
  const date = game.playedAt.slice(0, 10)
  return {
    title: `${game.white} vs ${game.black} · ${date}`,
    slug: chessGamePageName(game.externalId),
    externalId: game.externalId,
    playerColor: game.alanColor,
    outcome: game.outcome,
    white: game.white,
    black: game.black,
    playedAt: game.playedAt,
    rated: false,
    variant: "standard",
    speed: "unlimited",
    timeControl: "-",
    result: game.result,
    winner: game.winner,
    ply: game.plies.length,
    pgn: game.pgn,
  }
}
