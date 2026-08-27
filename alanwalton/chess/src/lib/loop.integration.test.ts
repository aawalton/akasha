import { describe, expect, test } from "bun:test"
import { stockfishAvailable } from "./engine"
import { runGame } from "./loop"
import { applyMove } from "./position"

const START = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

function scripted(moves: readonly string[]): () => Promise<string | null> {
  const queue = [...moves]
  return () => Promise.resolve(queue.shift() ?? null)
}

describe("runGame (real Stockfish legality/terminal)", () => {
  test("stockfish is provisioned on PATH (brew install stockfish)", () => {
    expect(stockfishAvailable()).toBe(true)
  })

  test("a scripted fool's mate reaches checkmate and produces a reviewable game", async () => {
    const game = await runGame({
      startFen: START,
      alanColor: "black",
      band: 1500,
      playedAt: "2026-07-01T12:00:00.000Z",
      deps: {
        maiaMove: scripted(["f2f3", "g2g4"]),
        readAlanMove: scripted(["e7e5", "d8h4"]),
        applyMove: (fen, move) => applyMove(fen, move),
      },
    })
    expect(game.endReason).toBe("checkmate")
    expect(game.winner).toBe("black")
    expect(game.result).toBe("0-1")
    expect(game.outcome).toBe("win")
    expect(game.plies.length).toBe(4)
    expect(game.pgn).toContain("1. f2f3 e7e5")
    expect(game.pgn).toContain("2. g2g4 d8h4")
  })
})
