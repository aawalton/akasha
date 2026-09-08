import "../readout-look/readout-look.stylesheet.styles.css"
import type { ReactElement } from "react"
import type { ReadoutScale } from "../readout-scales/readout-scale.page-type.ts"

export type Rung = "black" | "red" | "orange" | "yellow" | "green" | "blue"

export type Drawn = {
  readonly label: string
  readonly value: number
  readonly scale: ReadoutScale
  readonly unit?: string
}

const RUNGS: readonly (readonly [Rung, (scale: ReadoutScale) => number | undefined])[] = [
  ["black", (scale) => scale.blackAt],
  ["red", (scale) => scale.redAt],
  ["orange", (scale) => scale.orangeAt],
  ["yellow", (scale) => scale.yellowAt],
  ["green", (scale) => scale.greenAt],
  ["blue", (scale) => scale.blueAt],
]

const SIZE = 120

const STROKE = 12

const MIDDLE = SIZE / 2

const RADIUS = (SIZE - STROKE) / 2

const AROUND = 2 * Math.PI * RADIUS

const TURNED = -90

const NONE = "none"

export function statedIn(scale: ReadoutScale): readonly number[] {
  const found: number[] = []
  for (const [, at] of RUNGS) {
    const said = at(scale)
    if (said !== undefined) found.push(said)
  }
  return found
}

export function rungOf(scale: ReadoutScale, value: number): Rung | null {
  let held: Rung | null = null
  let reached = Number.NEGATIVE_INFINITY
  for (const [rung, at] of RUNGS) {
    const said = at(scale)
    if (said === undefined || value < said || said <= reached) continue
    held = rung
    reached = said
  }
  return held
}

export function sweptBy(scale: ReadoutScale, value: number): number {
  const stated = statedIn(scale)
  if (stated.length < 2) return 0
  const least = Math.min(...stated)
  const most = Math.max(...stated)
  if (most === least) return 0
  return Math.min(1, Math.max(0, (value - least) / (most - least)))
}

export function ReadoutRing({ label, value, scale, unit }: Drawn): ReactElement {
  const swept = sweptBy(scale, value)
  return (
    <figure className="readout-ring" data-rung={rungOf(scale, value) ?? NONE}>
      <svg
        className="readout-ring-dial"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={label}
      >
        <circle
          className="readout-ring-track"
          cx={MIDDLE}
          cy={MIDDLE}
          r={RADIUS}
          strokeWidth={STROKE}
        />
        <circle
          className="readout-ring-arc"
          cx={MIDDLE}
          cy={MIDDLE}
          r={RADIUS}
          strokeWidth={STROKE}
          strokeDasharray={`${AROUND * swept} ${AROUND}`}
          transform={`rotate(${TURNED} ${MIDDLE} ${MIDDLE})`}
        />
      </svg>
      <figcaption className="readout-ring-caption">
        <span className="readout-ring-value">{value}</span>
        {unit === undefined ? null : <span className="readout-ring-unit">{unit}</span>}
        <span className="readout-ring-label">{label}</span>
      </figcaption>
    </figure>
  )
}
