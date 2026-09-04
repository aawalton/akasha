"use client"
import { useEffect, useRef } from "react"
import type { ChessMoveListEntry } from "../state/chess-state.module.code.ts"

export interface ChessMoveListProps {
  readonly moves: readonly ChessMoveListEntry[]
  readonly currentPly: number
  readonly onJump: (ply: number) => undefined
}

interface MoveRow {
  moveNumber: number
  white?: ChessMoveListEntry
  black?: ChessMoveListEntry
}

function toRows(moves: readonly ChessMoveListEntry[]): readonly MoveRow[] {
  const rows: MoveRow[] = []
  for (const move of moves) {
    let row = rows[rows.length - 1]
    if (row === undefined || row.moveNumber !== move.moveNumber) {
      row = { moveNumber: move.moveNumber }
      rows.push(row)
    }
    if (move.color === "w") row.white = move
    else row.black = move
  }
  return rows
}

function MoveCell({
  move,
  currentPly,
  onJump,
}: {
  readonly move: ChessMoveListEntry | undefined
  readonly currentPly: number
  readonly onJump: (ply: number) => undefined
}) {
  if (move === undefined) return <span className="chess-move-san chess-move-san-empty" />
  const isCurrent = move.ply === currentPly
  return (
    <button
      type="button"
      className={isCurrent ? "chess-move-san is-current" : "chess-move-san"}
      data-ply={move.ply}
      aria-current={isCurrent ? "true" : undefined}
      onClick={() => onJump(move.ply)}
    >
      {move.san}
    </button>
  )
}

export default function ChessMoveList({ moves, currentPly, onJump }: ChessMoveListProps) {
  const listRef = useRef<HTMLDivElement | null>(null)
  const rows = toRows(moves)

  useEffect(() => {
    const container = listRef.current
    if (container == null) return
    const active = container.querySelector(`[data-ply="${currentPly}"]`)
    if (active != null) active.scrollIntoView({ block: "nearest" })
  }, [currentPly])

  return (
    <div ref={listRef} className="chess-move-list">
      {rows.map((row) => (
        <div key={row.moveNumber} className="chess-move-row">
          <span className="chess-move-num">{row.moveNumber}.</span>
          <MoveCell move={row.white} currentPly={currentPly} onJump={onJump} />
          <MoveCell move={row.black} currentPly={currentPly} onJump={onJump} />
        </div>
      ))}
    </div>
  )
}
