import { describe, expect, test } from "bun:test"
import type { CompletedGame } from "./loop"
import { CHESS_GAME_SLUG, chessGamePageName, chessGameValues } from "./persist-game"

const GAME: CompletedGame = {
  startFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  plies: [
    { moveUci: "f2f3", color: "white", fenAfter: "x" },
    { moveUci: "e7e5", color: "black", fenAfter: "x" },
    { moveUci: "g2g4", color: "white", fenAfter: "x" },
    { moveUci: "d8h4", color: "black", fenAfter: "x" },
  ],
  winner: "black",
  result: "0-1",
  endReason: "checkmate",
  alanColor: "black",
  outcome: "win",
  band: 1500,
  playedAt: "2026-07-01T12:00:00.000Z",
  white: "Maia 1500",
  black: "Alan",
  externalId: "maia-game_1751371200000",
  pgn: '[Event "Erin sparring vs Maia"]\n\n1. f2f3 e7e5 2. g2g4 d8h4 0-1\n',
}

describe("CHESS_GAME_SLUG", () => {
  test("references the chess-game page-type by its stable slug (owned by @alanwalton/chess-games)", () => {
    expect(CHESS_GAME_SLUG).toBe("chess-game")
  })
})

describe("chessGameValues", () => {
  const props = chessGameValues(GAME)

  test("names the page for its external id and carries a human title", () => {
    expect(props["slug"]).toBe(chessGamePageName(GAME.externalId))
    expect(props["title"]).toBe("Maia 1500 vs Alan · 2026-07-01")
  })

  test("carries no userId, which no file-backed page holds", () => {
    expect("userId" in props).toBe(false)
  })

  test("carries the reviewable record and the game result fields", () => {
    expect(props["pgn"]).toBe(GAME.pgn)
    expect(props["result"]).toBe("0-1")
    expect(props["winner"]).toBe("black")
    expect(props["playerColor"]).toBe("black")
    expect(props["outcome"]).toBe("win")
    expect(props["white"]).toBe("Maia 1500")
    expect(props["black"]).toBe("Alan")
    expect(props["playedAt"]).toBe("2026-07-01T12:00:00.000Z")
    expect(props["ply"]).toBe(4)
    expect(props["externalId"]).toBe("maia-game_1751371200000")
  })

  test("marks the game as an unrated, standard, untimed local game", () => {
    expect(props["rated"]).toBe(false)
    expect(props["variant"]).toBe("standard")
  })

  test("omits the import-only `source` select entirely (no page-type shape change)", () => {
    expect("source" in props).toBe(false)
    expect("sourceGameId" in props).toBe(false)
    expect("sourceUrl" in props).toBe(false)
    expect("handle" in props).toBe(false)
  })
})
