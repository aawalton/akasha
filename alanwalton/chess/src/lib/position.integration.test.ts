import { describe, expect, test } from "bun:test"
import { stockfishAvailable } from "./engine"
import { applyMove, evaluate, legalMoves, playMove } from "./position"

const STARTPOS = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
const MATE_IN_1 = "6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1"

describe("legalMoves (real engine)", () => {
  test("stockfish is provisioned on PATH (brew install stockfish)", () => {
    expect(stockfishAvailable()).toBe(true)
  })

  test("start position has exactly 20 legal moves including e2e4", async () => {
    const moves = await legalMoves(STARTPOS)
    expect(moves.length).toBe(20)
    expect(moves).toContain("e2e4")
    expect(moves).toContain("g1f3")
  })
  test("a checkmated position has zero legal moves", async () => {
    const moves = await legalMoves("R5k1/5ppp/8/8/8/8/8/6K1 b - - 1 1")
    expect(moves.length).toBe(0)
  })
})

describe("evaluate (real engine)", () => {
  test("start position evaluates near-equal, slightly for White", async () => {
    const r = await evaluate(STARTPOS, 14)
    expect(r.scoreKind).toBe("cp")
    expect(r.scoreWhitePov).toBeGreaterThan(0)
    expect(r.scoreWhitePov).toBeLessThan(150)
    expect(r.bestMove).not.toBeNull()
  })
  test("mate-in-1 is reported as mate for White with the mating move", async () => {
    const r = await evaluate(MATE_IN_1, 14)
    expect(r.scoreKind).toBe("mate")
    expect(r.scoreWhitePov).toBeGreaterThan(0)
    expect(r.bestMove).toBe("a1a8")
  })
})

describe("applyMove (real engine)", () => {
  test("e2e4 yields the expected FEN and an ongoing game", async () => {
    const r = await applyMove(STARTPOS, "e2e4")
    expect(r.fen).toBe("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1")
    expect(r.status).toBe("ongoing")
    expect(r.sideToMove).toBe("b")
  })
  test("the mating move is classified as checkmate", async () => {
    const r = await applyMove(MATE_IN_1, "a1a8")
    expect(r.status).toBe("checkmate")
    expect(r.checkers).toContain("a8")
    expect(r.legalMoveCount).toBe(0)
  })
  test("an illegal move is rejected", async () => {
    await expect(applyMove(STARTPOS, "e2e5")).rejects.toThrow()
  })
})

describe("playMove (real engine)", () => {
  test("returns a legal reply at a capped Elo", async () => {
    const r = await playMove(STARTPOS, { elo: 1400, movetimeMs: 300 })
    expect(r.move).not.toBeNull()
    if (r.move === null) {
      return
    }
    const legal = await legalMoves(STARTPOS)
    expect(legal).toContain(r.move)
    expect(r.strength).toEqual({ mode: "elo", value: 1400 })
  })
  test("returns a legal reply at a low Skill Level", async () => {
    const r = await playMove(STARTPOS, { level: 1, movetimeMs: 300 })
    expect(r.move).not.toBeNull()
    expect(r.strength.mode).toBe("level")
  })
})
