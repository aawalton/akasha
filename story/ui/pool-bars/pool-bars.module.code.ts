import type { PoolPresentation } from "@akasha/story-engine-core/game-schema"
import type { ClientHud } from "../client-session/client-session.module.code.ts"

export interface PoolBar {
  readonly key: string
  readonly label: string
  readonly color: PoolPresentation["color"]
  readonly cur: number
  readonly max: number | undefined
  readonly pct: number
  readonly delta: number | undefined
}

function fillPct(cur: number, max: number | undefined): number {
  if (max === undefined || max <= 0) return 0
  return Math.max(0, Math.min(100, (100 * cur) / max))
}

export function computePoolBars(
  hud: ClientHud,
  presentation: readonly PoolPresentation[]
): readonly PoolBar[] {
  const pools = hud.pools ?? {}
  const delta = hud.delta ?? {}
  return presentation.flatMap((p) => {
    const cur = pools[p.key]
    if (typeof cur !== "number") return []
    const max = p.max !== undefined ? pools[p.max] : undefined
    return [
      {
        key: p.key,
        label: p.label,
        color: p.color,
        cur,
        max,
        pct: fillPct(cur, max),
        delta: delta[p.key],
      },
    ]
  })
}
