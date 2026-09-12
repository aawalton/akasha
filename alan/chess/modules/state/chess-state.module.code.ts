import { Chess } from "chess.js"

export type ChessStatus = "ongoing" | "check" | "checkmate" | "stalemate" | "draw"

export interface ChessMoveInput {
  readonly from: string
  readonly to: string
  readonly promotion?: "q" | "r" | "b" | "n"
}

export interface ChessState {
  readonly startFen: string
  readonly history: readonly string[]
  readonly ply: number
}

export interface ChessMoveListEntry {
  readonly ply: number
  readonly san: string
  readonly color: "w" | "b"
  readonly moveNumber: number
}

export interface ChessSnapshot {
  readonly fen: string
  readonly pgn: string
  readonly turn: "w" | "b"
  readonly status: ChessStatus
  readonly legalDests: ReadonlyMap<string, readonly string[]>
  readonly lastMoveUci: string | null
  readonly ply: number
  readonly plyCount: number
}

export interface ChessMoveResult {
  readonly state: ChessState
  readonly snapshot: ChessSnapshot
  readonly uci: string
}

const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

function clamp(value: number, min: number, max: number): number {
  if (value < min) return min
  if (value > max) return max
  return value
}

function rebuild(state: ChessState, ply: number): Chess {
  const chess = new Chess(state.startFen)
  const stop = clamp(ply, 0, state.history.length)
  for (let i = 0; i < stop; i++) {
    chess.move(state.history[i] ?? "")
  }
  return chess
}

function classifyStatus(chess: Chess): ChessStatus {
  if (chess.isCheckmate()) return "checkmate"
  if (chess.isStalemate()) return "stalemate"
  if (chess.isDraw()) return "draw"
  if (chess.isCheck()) return "check"
  return "ongoing"
}

function legalDestsOf(chess: Chess): ReadonlyMap<string, readonly string[]> {
  const dests = new Map<string, string[]>()
  for (const move of chess.moves({ verbose: true })) {
    const existing = dests.get(move.from)
    if (existing) existing.push(move.to)
    else dests.set(move.from, [move.to])
  }
  return dests
}

export function createChessState(init?: {
  readonly fen?: string
  readonly pgn?: string
}): ChessState {
  if (init?.pgn != null && init.pgn.trim() !== "") {
    const loaded = new Chess()
    loaded.loadPgn(init.pgn)
    const history = loaded.history({ verbose: true }).map((move) => move.lan)
    const base = new Chess()
    base.loadPgn(init.pgn)
    while (base.undo() != null) {}
    return { startFen: base.fen(), history, ply: history.length }
  }
  const startFen = init?.fen != null && init.fen.trim() !== "" ? init.fen.trim() : START_FEN
  return { startFen, history: [], ply: 0 }
}

export function deriveSnapshot(state: ChessState): ChessSnapshot {
  const chess = rebuild(state, state.ply)
  const ply = clamp(state.ply, 0, state.history.length)
  return {
    fen: chess.fen(),
    pgn: chess.pgn(),
    turn: chess.turn(),
    status: classifyStatus(chess),
    legalDests: legalDestsOf(chess),
    lastMoveUci: ply > 0 ? (state.history[ply - 1] ?? null) : null,
    ply,
    plyCount: state.history.length,
  }
}

export function applyMove(state: ChessState, move: ChessMoveInput): ChessMoveResult | null {
  const chess = rebuild(state, state.ply)
  let uci: string
  try {
    const applied = chess.move({ from: move.from, to: move.to, promotion: move.promotion ?? "q" })
    uci = applied.lan
  } catch {
    return null
  }
  const truncated = state.history.slice(0, clamp(state.ply, 0, state.history.length))
  const nextState: ChessState = {
    startFen: state.startFen,
    history: [...truncated, uci],
    ply: truncated.length + 1,
  }
  return { state: nextState, snapshot: deriveSnapshot(nextState), uci }
}

export function stepToPly(state: ChessState, ply: number): ChessState {
  return { ...state, ply: clamp(ply, 0, state.history.length) }
}

export function deriveMoveList(state: ChessState): readonly ChessMoveListEntry[] {
  const chess = new Chess(state.startFen)
  const entries: ChessMoveListEntry[] = []
  for (let i = 0; i < state.history.length; i++) {
    const uci = state.history[i] ?? ""
    const fenFullMove = chess.fen().split(" ")[5] ?? "1"
    const moveNumber = Number.parseInt(fenFullMove, 10)
    const promotion = uci.length > 4 ? uci.slice(4, 5) : undefined
    const applied = chess.move({
      from: uci.slice(0, 2),
      to: uci.slice(2, 4),
      promotion,
    })
    entries.push({ ply: i + 1, san: applied.san, color: applied.color, moveNumber })
  }
  return entries
}
