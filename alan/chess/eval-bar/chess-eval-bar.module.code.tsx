"use client"
import "../board-look/chess-board-look.stylesheet.styles.css"

export interface ChessEvalBarProps {
  readonly whiteFraction: number
  readonly orientation: "white" | "black"
}

function clampFraction(value: number): number {
  if (value < 0) return 0
  if (value > 1) return 1
  return value
}

export default function ChessEvalBar({ whiteFraction, orientation }: ChessEvalBarProps) {
  const pct = clampFraction(whiteFraction) * 100
  return (
    <div className="chess-eval-bar" data-orientation={orientation} aria-hidden="true">
      <div className="chess-eval-bar-white" style={{ height: `${pct}%` }} />
    </div>
  )
}
