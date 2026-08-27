import { describe, expect, test } from "bun:test"
import {
  buildPgn,
  detectTerminal,
  halfmoveClock,
  isFiftyMove,
  opponentOf,
  outcomeFor,
  positionKey,
  repetitionCount,
  resignationVerdict,
  STANDARD_START_FEN,
  winnerToResult,
} from "./game"

const START = STANDARD_START_FEN

describe("positionKey", () => {
  test("keeps the first four FEN fields (placement, side, castling, ep), drops the clocks", () => {
    expect(positionKey(START)).toBe("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -")
    expect(positionKey("8/8/8/8/8/8/8/K6k w - - 99 60")).toBe(
      positionKey("8/8/8/8/8/8/8/K6k w - - 3 12")
    )
  })
})

describe("halfmoveClock / isFiftyMove", () => {
  test("reads the halfmove clock (field 5), defaulting to 0 when absent", () => {
    expect(halfmoveClock(START)).toBe(0)
    expect(halfmoveClock("8/8/8/8/8/8/8/K6k w - - 100 60")).toBe(100)
    expect(halfmoveClock("8/8/8/8/8/8/8/K6k w -")).toBe(0)
  })
  test("fifty-move rule triggers at a 100-halfmove clock", () => {
    expect(isFiftyMove("8/8/8/8/8/8/8/K6k w - - 99 60")).toBe(false)
    expect(isFiftyMove("8/8/8/8/8/8/8/K6k w - - 100 60")).toBe(true)
    expect(isFiftyMove("8/8/8/8/8/8/8/K6k w - - 137 80")).toBe(true)
  })
})

describe("repetitionCount", () => {
  test("counts exact key occurrences", () => {
    const keys = ["a", "b", "a", "c", "a"]
    expect(repetitionCount(keys, "a")).toBe(3)
    expect(repetitionCount(keys, "b")).toBe(1)
    expect(repetitionCount(keys, "z")).toBe(0)
  })
})

describe("opponentOf / winnerToResult / outcomeFor", () => {
  test("opponentOf flips color", () => {
    expect(opponentOf("white")).toBe("black")
    expect(opponentOf("black")).toBe("white")
  })
  test("winnerToResult produces the PGN scoreline", () => {
    expect(winnerToResult("white")).toBe("1-0")
    expect(winnerToResult("black")).toBe("0-1")
    expect(winnerToResult("draw")).toBe("1/2-1/2")
  })
  test("outcomeFor is from Alan's perspective", () => {
    expect(outcomeFor("white", "white")).toBe("win")
    expect(outcomeFor("white", "black")).toBe("loss")
    expect(outcomeFor("black", "black")).toBe("win")
    expect(outcomeFor("draw", "white")).toBe("draw")
  })
})

describe("detectTerminal", () => {
  test("checkmate → the side that just moved wins", () => {
    const v = detectTerminal({
      status: "checkmate",
      moverColor: "black",
      fenAfter: "rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3",
      positionKeys: ["k1"],
    })
    expect(v).toEqual({ reason: "checkmate", winner: "black" })
  })
  test("stalemate → draw", () => {
    const v = detectTerminal({
      status: "stalemate",
      moverColor: "white",
      fenAfter: "7k/5Q2/6K1/8/8/8/8/8 b - - 0 1",
      positionKeys: ["k1"],
    })
    expect(v).toEqual({ reason: "stalemate", winner: "draw" })
  })
  test("ongoing position with a 100-halfmove clock → fifty-move draw", () => {
    const v = detectTerminal({
      status: "ongoing",
      moverColor: "white",
      fenAfter: "8/8/8/8/8/8/8/K6k b - - 100 60",
      positionKeys: ["only-once"],
    })
    expect(v).toEqual({ reason: "fifty-move", winner: "draw" })
  })
  test("ongoing position seen a third time → threefold draw", () => {
    const key = positionKey("8/8/8/8/8/8/8/K6k b - - 4 60")
    const v = detectTerminal({
      status: "ongoing",
      moverColor: "white",
      fenAfter: "8/8/8/8/8/8/8/K6k b - - 4 60",
      positionKeys: [key, "other", key, key],
    })
    expect(v).toEqual({ reason: "threefold", winner: "draw" })
  })
  test("an ongoing, non-repeated, low-clock position is not terminal", () => {
    const v = detectTerminal({
      status: "ongoing",
      moverColor: "white",
      fenAfter: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
      positionKeys: ["fresh"],
    })
    expect(v).toBeNull()
  })
  test("check (not mate) is not terminal", () => {
    const v = detectTerminal({
      status: "check",
      moverColor: "white",
      fenAfter: "rnbqkbnr/ppp1pppp/8/1B1p4/4P3/8/PPPP1PPP/RNBQK1NR b KQkq - 1 2",
      positionKeys: ["fresh"],
    })
    expect(v).toBeNull()
  })
})

describe("resignationVerdict", () => {
  test("the resigning side loses; the opponent wins", () => {
    expect(resignationVerdict("white")).toEqual({ reason: "resignation", winner: "black" })
    expect(resignationVerdict("black")).toEqual({ reason: "resignation", winner: "white" })
  })
})

describe("buildPgn", () => {
  const headers = {
    event: "Erin sparring vs Maia",
    site: "local",
    date: "2026-07-01",
    white: "Alan",
    black: "Maia 1500",
    result: "0-1",
  }
  test("emits the seven-tag roster and UCI long-algebraic movetext", () => {
    const pgn = buildPgn({
      startFen: START,
      plies: [
        { moveUci: "f2f3", color: "white", fenAfter: "x" },
        { moveUci: "e7e5", color: "black", fenAfter: "x" },
        { moveUci: "g2g4", color: "white", fenAfter: "x" },
        { moveUci: "d8h4", color: "black", fenAfter: "x" },
      ],
      headers,
    })
    expect(pgn).toContain('[Event "Erin sparring vs Maia"]')
    expect(pgn).toContain('[White "Alan"]')
    expect(pgn).toContain('[Black "Maia 1500"]')
    expect(pgn).toContain('[Result "0-1"]')
    expect(pgn).toContain("1. f2f3 e7e5")
    expect(pgn).toContain("2. g2g4 d8h4")
    expect(pgn.trimEnd().endsWith("0-1")).toBe(true)
    expect(pgn).not.toContain("[SetUp")
    expect(pgn).not.toContain("[FEN")
  })
  test("a non-standard start position carries SetUp + FEN tags", () => {
    const fen = "6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1"
    const pgn = buildPgn({
      startFen: fen,
      plies: [{ moveUci: "a1a8", color: "white", fenAfter: "x" }],
      headers: { ...headers, result: "1-0" },
    })
    expect(pgn).toContain('[SetUp "1"]')
    expect(pgn).toContain(`[FEN "${fen}"]`)
    expect(pgn).toContain("1. a1a8")
  })
})
