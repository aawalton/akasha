import { describe, expect, test } from "bun:test"
import { stockfishAvailable } from "./engine"
import { maiaAvailable, playMaiaMove } from "./maia"
import { legalMoves } from "./position"

const START = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

describe("playMaiaMove (real lc0 + Maia weights)", () => {
  test("lc0 + maia-1500 weights + stockfish are provisioned", () => {
    expect(maiaAvailable(1500)).toBe(true)
    expect(stockfishAvailable()).toBe(true)
  })

  test("returns a legal reply from the start position", async () => {
    const move = await playMaiaMove(START, 1500)
    expect(move).not.toBeNull()
    if (move === null) return
    const legal = await legalMoves(START)
    expect(legal).toContain(move)
  })
})
