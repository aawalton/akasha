import { describe, expect, test } from "bun:test"
import { fenSideToMove, parseFen, parseUciMove } from "@alanwalton/chess/lib/uci"
import type { ChessState } from "./chess-state"
import {
  applyMove,
  createChessState,
  deriveMoveList,
  deriveSnapshot,
  stepToPly,
} from "./chess-state"

const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

function mustMove(state: ChessState, from: string, to: string): ChessState {
  const res = applyMove(state, { from, to })
  if (res === null) throw new Error(`expected ${from}${to} to be legal`)
  return res.state
}

describe("createChessState", () => {
  test("defaults to the standard initial position", () => {
    const snap = deriveSnapshot(createChessState())
    expect(snap.fen).toBe(START_FEN)
    expect(snap.turn).toBe("w")
    expect(snap.status).toBe("ongoing")
    expect(snap.plyCount).toBe(0)
    expect(snap.lastMoveUci).toBeNull()
    expect(snap.legalDests.get("e2")).toContain("e4")
    expect(snap.legalDests.get("e2")).toContain("e3")
  })

  test("accepts an explicit initial FEN", () => {
    const fen = "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 2 3"
    const snap = deriveSnapshot(createChessState({ fen }))
    expect(snap.fen).toBe(fen)
    expect(snap.turn).toBe("b")
  })
})

describe("applyMove", () => {
  test("a legal move updates fen/pgn and yields a UCI string", () => {
    const res = applyMove(createChessState(), { from: "e2", to: "e4" })
    expect(res).not.toBeNull()
    if (res === null) throw new Error("unreachable")
    expect(res.uci).toBe("e2e4")
    expect(res.snapshot.fen).toContain(" b ")
    expect(res.snapshot.pgn).toContain("e4")
    expect(res.snapshot.lastMoveUci).toBe("e2e4")
    expect(res.snapshot.plyCount).toBe(1)
    expect(res.snapshot.turn).toBe("b")
  })

  test("an illegal move yields null (no throw)", () => {
    expect(applyMove(createChessState(), { from: "e2", to: "e5" })).toBeNull()
  })
})

describe("rail-consumability", () => {
  test("the board's FEN + UCI output parse cleanly through the engine rail", () => {
    const res = applyMove(createChessState(), { from: "e2", to: "e4" })
    if (res === null) throw new Error("expected a legal move")
    expect(parseFen(res.snapshot.fen)).toBe(res.snapshot.fen)
    expect(parseUciMove(res.uci)).toBe("e2e4")
    expect(fenSideToMove(res.snapshot.fen)).toBe(res.snapshot.turn)
  })

  test("every legal destination the board offers is a rail-valid UCI move", () => {
    const snap = deriveSnapshot(createChessState())
    for (const [from, tos] of snap.legalDests) {
      for (const to of tos) {
        expect(() => parseUciMove(from + to)).not.toThrow()
      }
    }
  })
})

describe("deriveMoveList", () => {
  test("yields SAN, color, ply, and full-move number for each move", () => {
    const state = createChessState({ pgn: "1. e4 e5 2. Nf3 Nc6 *" })
    const moves = deriveMoveList(state)
    expect(moves.map((m) => m.san)).toEqual(["e4", "e5", "Nf3", "Nc6"])
    expect(moves.map((m) => m.color)).toEqual(["w", "b", "w", "b"])
    expect(moves.map((m) => m.ply)).toEqual([1, 2, 3, 4])
    expect(moves.map((m) => m.moveNumber)).toEqual([1, 1, 2, 2])
  })

  test("the ply of each entry addresses that move's position via stepToPly", () => {
    const state = createChessState({ pgn: "1. e4 e5 2. Nf3 Nc6 *" })
    const moves = deriveMoveList(state)
    const last = moves[moves.length - 1]
    if (last === undefined) throw new Error("expected moves")
    expect(deriveSnapshot(stepToPly(state, last.ply)).ply).toBe(4)
    const first = moves[0]
    if (first === undefined) throw new Error("expected moves")
    expect(deriveSnapshot(stepToPly(state, first.ply)).fen).toContain(" b ")
  })

  test("an empty game (no moves) yields an empty list", () => {
    expect(deriveMoveList(createChessState())).toEqual([])
  })

  test("full-move numbers honor a non-standard start position (black to move)", () => {
    const fen = "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 2 3"
    const state = createChessState({ fen })
    const res = applyMove(state, { from: "f8", to: "c5" })
    if (res === null) throw new Error("expected a legal move")
    const moves = deriveMoveList(res.state)
    expect(moves).toHaveLength(1)
    expect(moves[0]?.moveNumber).toBe(3)
    expect(moves[0]?.color).toBe("b")
  })
})

describe("stepToPly (review navigation)", () => {
  test("steps back to an earlier position while preserving full history", () => {
    let state = createChessState()
    state = mustMove(state, "e2", "e4")
    state = mustMove(state, "e7", "e5")
    const back = deriveSnapshot(stepToPly(state, 1))
    expect(back.plyCount).toBe(2)
    expect(back.ply).toBe(1)
    expect(back.fen).toContain(" b ")
  })

  test("clamps out-of-range plies to the valid window", () => {
    let state = createChessState()
    state = mustMove(state, "e2", "e4")
    expect(deriveSnapshot(stepToPly(state, 99)).ply).toBe(1)
    expect(deriveSnapshot(stepToPly(state, -5)).ply).toBe(0)
  })
})
