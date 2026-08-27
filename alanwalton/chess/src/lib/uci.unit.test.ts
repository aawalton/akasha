import { describe, expect, test } from "bun:test"
import {
  fenSideToMove,
  parseCheckers,
  parseDisplayedFen,
  parseFen,
  parsePerftMoves,
  parseSearch,
  parseUciMove,
} from "./uci"

const STARTPOS = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

describe("parseUciMove", () => {
  test("accepts and lowercases a normal move", () => {
    expect(parseUciMove("E2E4")).toBe("e2e4")
  })
  test("accepts a promotion", () => {
    expect(parseUciMove("e7e8q")).toBe("e7e8q")
  })
  test("rejects garbage", () => {
    expect(() => parseUciMove("e2")).toThrow()
    expect(() => parseUciMove("z9z9")).toThrow()
    expect(() => parseUciMove("e2e4k")).toThrow()
  })
})

describe("parseFen", () => {
  test("accepts the start position", () => {
    expect(parseFen(STARTPOS)).toBe(STARTPOS)
  })
  test("accepts a 4-field FEN (no move clocks)", () => {
    expect(parseFen("8/8/8/8/8/8/8/8 w - -")).toBe("8/8/8/8/8/8/8/8 w - -")
  })
  test("rejects wrong rank count", () => {
    expect(() => parseFen("8/8/8/8/8/8/8 w - - 0 1")).toThrow()
  })
  test("rejects a rank that does not sum to 8", () => {
    expect(() => parseFen("rnbqkbnr/ppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1")).toThrow()
  })
  test("rejects a bad side-to-move", () => {
    expect(() => parseFen("8/8/8/8/8/8/8/8 x - - 0 1")).toThrow()
  })
  test("rejects an illegal placement character", () => {
    expect(() => parseFen("8/8/8/8/8/8/8/7X w - - 0 1")).toThrow()
  })
})

describe("fenSideToMove", () => {
  test("reads white and black", () => {
    expect(fenSideToMove(STARTPOS)).toBe("w")
    expect(fenSideToMove("8/8/8/8/8/8/8/8 b - - 0 1")).toBe("b")
  })
})

describe("parsePerftMoves", () => {
  test("extracts and sorts moves from perft output", () => {
    const lines = ["info string x", "e2e4: 1", "a2a3: 1", "Nodes searched: 2"]
    expect(parsePerftMoves(lines)).toEqual(["a2a3", "e2e4"])
  })
  test("returns empty for a terminal position", () => {
    expect(parsePerftMoves(["Nodes searched: 0"])).toEqual([])
  })
  test("captures promotion moves", () => {
    expect(parsePerftMoves(["e7e8q: 1", "Nodes searched: 1"])).toEqual(["e7e8q"])
  })
})

describe("parseDisplayedFen / parseCheckers", () => {
  test("reads the Fen line", () => {
    expect(parseDisplayedFen(["Fen: 8/8/8/8/8/8/8/8 w - - 0 1", "Checkers: "])).toBe(
      "8/8/8/8/8/8/8/8 w - - 0 1"
    )
  })
  test("checkers empty when not in check", () => {
    expect(parseCheckers(["Checkers: "])).toEqual([])
  })
  test("checkers lists giving squares", () => {
    expect(parseCheckers(["Checkers: a8 h4"])).toEqual(["a8", "h4"])
  })
})

describe("parseSearch", () => {
  test("parses a centipawn score, depth, pv, and bestmove", () => {
    const lines = [
      "info depth 10 score cp 49 pv e2e4 c7c5",
      "info depth 14 score cp 31 pv d2d4 d7d5 g1f3",
      "bestmove d2d4",
    ]
    const r = parseSearch(lines)
    expect(r.kind).toBe("cp")
    expect(r.value).toBe(31)
    expect(r.depth).toBe(14)
    expect(r.pv).toEqual(["d2d4", "d7d5", "g1f3"])
    expect(r.bestMove).toBe("d2d4")
  })
  test("parses a mate score", () => {
    const r = parseSearch(["info depth 17 score mate 1 pv a1a8", "bestmove a1a8"])
    expect(r.kind).toBe("mate")
    expect(r.value).toBe(1)
    expect(r.bestMove).toBe("a1a8")
  })
  test("handles a terminal position (bestmove (none))", () => {
    const r = parseSearch(["bestmove (none)"])
    expect(r.bestMove).toBeNull()
  })
})
