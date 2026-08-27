import { describe, expect, test } from "bun:test"
import { runGame } from "./loop"
import type { PositionStatus } from "./position"

const START = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

interface FakeApply {
  readonly fen: string
  readonly status: PositionStatus
  readonly sideToMove: "w" | "b"
}

function scriptedMoves(moves: readonly string[]): () => Promise<string | null> {
  const queue = [...moves]
  return () => Promise.resolve(queue.shift() ?? null)
}

describe("runGame — drives a full game to a terminal, reviewable result", () => {
  test("scripted fool's mate (Alan as Black) completes as a checkmate win with a UCI-movetext PGN", async () => {
    const applied: Record<string, FakeApply> = {
      f2f3: { fen: "after-f2f3", status: "ongoing", sideToMove: "b" },
      e7e5: { fen: "after-e7e5", status: "ongoing", sideToMove: "w" },
      g2g4: { fen: "after-g2g4", status: "ongoing", sideToMove: "b" },
      d8h4: { fen: "after-d8h4", status: "checkmate", sideToMove: "w" },
    }
    const game = await runGame({
      startFen: START,
      alanColor: "black",
      band: 1500,
      playedAt: "2026-07-01T12:00:00.000Z",
      deps: {
        readAlanMove: scriptedMoves(["e7e5", "d8h4"]),
        maiaMove: scriptedMoves(["f2f3", "g2g4"]),
        applyMove: (_fen, move) => {
          const r = applied[move]
          if (r === undefined) throw new Error(`unexpected move ${move}`)
          return Promise.resolve(r)
        },
      },
    })

    expect(game.endReason).toBe("checkmate")
    expect(game.winner).toBe("black")
    expect(game.result).toBe("0-1")
    expect(game.outcome).toBe("win")
    expect(game.alanColor).toBe("black")
    expect(game.band).toBe(1500)
    expect(game.plies.length).toBe(4)
    expect(game.plies.map((p) => p.moveUci)).toEqual(["f2f3", "e7e5", "g2g4", "d8h4"])
    expect(game.white).toBe("Maia 1500")
    expect(game.black).toBe("Alan")
    expect(game.playedAt).toBe("2026-07-01T12:00:00.000Z")
    expect(game.externalId).toMatch(/^maia-game_/)
    expect(game.startFen).toBe(START)
    expect(game.pgn).toContain("1. f2f3 e7e5")
    expect(game.pgn).toContain("2. g2g4 d8h4")
    expect(game.pgn).toContain('[Result "0-1"]')
    expect(game.pgn).toContain('[Black "Alan"]')
  })

  test("Alan resigning (null move) ends the game as a loss for his side", async () => {
    const game = await runGame({
      startFen: START,
      alanColor: "white",
      band: 1300,
      playedAt: "2026-07-01T13:00:00.000Z",
      deps: {
        readAlanMove: scriptedMoves([]),
        maiaMove: scriptedMoves([]),
        applyMove: () => {
          throw new Error("applyMove must not be called when Alan resigns immediately")
        },
      },
    })

    expect(game.endReason).toBe("resignation")
    expect(game.winner).toBe("black")
    expect(game.result).toBe("0-1")
    expect(game.outcome).toBe("loss")
    expect(game.plies.length).toBe(0)
    expect(game.white).toBe("Alan")
    expect(game.black).toBe("Maia 1300")
  })
})
