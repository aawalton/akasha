"use client"
import "./chess-board.css"
import { useChromeToggle } from "@shared/pages-ui/components/use-chrome-toggle"
import { assertNever } from "@shared/utils-narrow/assert-never"
import { Chessground } from "chessground"
import type { Api as CgApi } from "chessground/api"
import type { Config as CgConfig } from "chessground/config"
import type { Key } from "chessground/types"
import {
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { z } from "zod"
import { evalToWhiteFraction, formatScore } from "./chess-eval"
import ChessEvalBar from "./chess-eval-bar"
import ChessMoveList from "./chess-move-list"
import type { ChessState, ChessStatus } from "./chess-state"
import {
  applyMove,
  createChessState,
  deriveMoveList,
  deriveSnapshot,
  stepToPly,
} from "./chess-state"

function asKey(square: string): Key {
  return square as Key
}

export interface ChessBoardProps {
  readonly initialFen?: string
  readonly initialPgn?: string
}

const analyzeResponseSchema = z.union([
  z.object({ engineAvailable: z.literal(false) }),
  z.object({
    engineAvailable: z.literal(true),
    scoreWhitePov: z.number(),
    scoreKind: z.enum(["cp", "mate"]),
    bestMove: z.string().nullable(),
  }),
])

type AnalyzeView =
  | { readonly kind: "idle" }
  | { readonly kind: "loading" }
  | { readonly kind: "unavailable" }
  | { readonly kind: "error" }
  | {
      readonly kind: "ok"
      readonly scoreWhitePov: number
      readonly scoreKind: "cp" | "mate"
      readonly bestMove: string | null
    }

const AUTO_ANALYSIS_DEBOUNCE_MS = 300

function cgColor(turn: "w" | "b"): "white" | "black" {
  return turn === "w" ? "white" : "black"
}

function toDests(legal: ReadonlyMap<string, readonly string[]>): Map<Key, Key[]> {
  const dests = new Map<Key, Key[]>()
  for (const [from, tos] of legal) {
    dests.set(
      asKey(from),
      tos.map((to) => asKey(to))
    )
  }
  return dests
}

function lastMoveKeys(uci: string | null): readonly Key[] | undefined {
  if (uci == null || uci.length < 4) return undefined
  return [asKey(uci.slice(0, 2)), asKey(uci.slice(2, 4))]
}

function statusLabel(status: ChessStatus, turn: "w" | "b"): string {
  const mover = turn === "w" ? "White" : "Black"
  switch (status) {
    case "checkmate":
      return `Checkmate — ${turn === "w" ? "Black" : "White"} wins`
    case "stalemate":
      return "Stalemate — draw"
    case "draw":
      return "Draw"
    case "check":
      return `${mover} to move — check`
    case "ongoing":
      return `${mover} to move`
    default:
      return assertNever(status)
  }
}

export default function ChessBoard({ initialFen, initialPgn }: ChessBoardProps) {
  const elRef = useRef<HTMLDivElement | null>(null)
  const apiRef = useRef<CgApi | null>(null)
  const [state, setState] = useState<ChessState>(() =>
    createChessState({ fen: initialFen, pgn: initialPgn })
  )
  const [orientation, setOrientation] = useState<"white" | "black">("white")
  const [analyze, setAnalyze] = useState<AnalyzeView>({ kind: "idle" })

  const snapshot = useMemo(() => deriveSnapshot(state), [state])
  const moves = useMemo(() => deriveMoveList(state), [state])

  const { onSurfaceClick } = useChromeToggle()

  const lastFenRef = useRef<string | null>(null)
  const analysisTokenRef = useRef(0)
  const engineAbsentRef = useRef(false)

  const jumpToPly = useCallback((ply: number) => {
    setState((prev) => stepToPly(prev, ply))
  }, [])

  const handleMove = useCallback((orig: Key, dest: Key) => {
    setState((prev) => {
      const res = applyMove(prev, { from: orig, to: dest })
      return res === null ? prev : res.state
    })
  }, [])

  const handleKeyDown = useCallback((event: ReactKeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowLeft":
        setState((prev) => stepToPly(prev, prev.ply - 1))
        break
      case "ArrowRight":
        setState((prev) => stepToPly(prev, prev.ply + 1))
        break
      case "Home":
        setState((prev) => stepToPly(prev, 0))
        break
      case "End":
        setState((prev) => stepToPly(prev, prev.history.length))
        break
      default:
        return
    }
    event.preventDefault()
  }, [])

  useEffect(() => {
    if (elRef.current == null) return
    const api = Chessground(elRef.current, {})
    apiRef.current = api
    return () => {
      api.destroy()
      apiRef.current = null
    }
  }, [])

  useEffect(() => {
    const api = apiRef.current
    if (api == null) return
    const movableColor =
      snapshot.status === "checkmate" ||
      snapshot.status === "stalemate" ||
      snapshot.status === "draw"
        ? undefined
        : cgColor(snapshot.turn)
    const lastMove = lastMoveKeys(snapshot.lastMoveUci)
    const config: CgConfig = {
      orientation,
      turnColor: cgColor(snapshot.turn),
      lastMove: lastMove == null ? undefined : [...lastMove],
      check: snapshot.status === "check" || snapshot.status === "checkmate",
      coordinates: true,
      movable: {
        free: false,
        color: movableColor,
        dests: toDests(snapshot.legalDests),
        showDests: true,
        events: { after: handleMove },
      },
      draggable: { enabled: true },
      drawable: { enabled: true, visible: true },
    }
    if (snapshot.fen !== lastFenRef.current) {
      config.fen = snapshot.fen
      lastFenRef.current = snapshot.fen
    }
    api.set(config)
  }, [snapshot, orientation, handleMove])

  useEffect(() => {
    if (engineAbsentRef.current) return
    const fen = snapshot.fen
    const token = ++analysisTokenRef.current
    const timer = setTimeout(async () => {
      setAnalyze({ kind: "loading" })
      try {
        const res = await fetch("/api/chess/analyze", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ fen }),
        })
        const parsed = analyzeResponseSchema.safeParse(await res.json())
        if (token !== analysisTokenRef.current) return
        if (!parsed.success) {
          setAnalyze({ kind: "error" })
          return
        }
        if (!parsed.data.engineAvailable) {
          engineAbsentRef.current = true
          setAnalyze({ kind: "unavailable" })
          return
        }
        setAnalyze({
          kind: "ok",
          scoreWhitePov: parsed.data.scoreWhitePov,
          scoreKind: parsed.data.scoreKind,
          bestMove: parsed.data.bestMove,
        })
      } catch {
        if (token === analysisTokenRef.current) setAnalyze({ kind: "error" })
      }
    }, AUTO_ANALYSIS_DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [snapshot.fen])

  const whiteFraction =
    analyze.kind === "ok" ? evalToWhiteFraction(analyze.scoreWhitePov, analyze.scoreKind) : 0.5

  const atStart = snapshot.ply <= 0
  const atEnd = snapshot.ply >= snapshot.plyCount

  return (
    <div
      className="chess-root"
      role="grid"
      aria-label="Chess board — arrow keys to review moves"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={onSurfaceClick}
    >
      <div className="chess-board-col">
        <ChessEvalBar whiteFraction={whiteFraction} orientation={orientation} />
        <div className="chess-board-frame" data-chrome-toggle-ignore>
          <div ref={elRef} className="chess-board cg-wrap" />
        </div>
      </div>
      <div className="chess-panel">
        <div className="chess-status">{statusLabel(snapshot.status, snapshot.turn)}</div>
        <ChessMoveList moves={moves} currentPly={snapshot.ply} onJump={jumpToPly} />
        <div className="chess-controls">
          <button
            type="button"
            className="chess-btn"
            onClick={() => setState((prev) => stepToPly(prev, 0))}
            disabled={atStart}
          >
            ⏮
          </button>
          <button
            type="button"
            className="chess-btn"
            onClick={() => setState((prev) => stepToPly(prev, prev.ply - 1))}
            disabled={atStart}
          >
            ◀
          </button>
          <span className="chess-ply">
            {snapshot.ply}/{snapshot.plyCount}
          </span>
          <button
            type="button"
            className="chess-btn"
            onClick={() => setState((prev) => stepToPly(prev, prev.ply + 1))}
            disabled={atEnd}
          >
            ▶
          </button>
          <button
            type="button"
            className="chess-btn"
            onClick={() => setState((prev) => stepToPly(prev, prev.history.length))}
            disabled={atEnd}
          >
            ⏭
          </button>
          <button
            type="button"
            className="chess-btn"
            onClick={() => setOrientation((o) => (o === "white" ? "black" : "white"))}
          >
            Flip
          </button>
        </div>
        <div className="chess-analysis">
          {analyze.kind === "loading" && <span className="chess-eval-note">Analyzing…</span>}
          {analyze.kind === "unavailable" && (
            <span className="chess-eval-note">
              Engine analysis unavailable in this environment.
            </span>
          )}
          {analyze.kind === "error" && (
            <span className="chess-eval-note">Analysis failed — try again.</span>
          )}
          {analyze.kind === "ok" && (
            <span className="chess-eval">
              {formatScore(analyze.scoreWhitePov, analyze.scoreKind)}
              {analyze.bestMove != null && (
                <span className="chess-best"> · best {analyze.bestMove}</span>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
