import type { GameState } from "akasha/alan/harness/idle-system/idle-state/idle-state.module.code.ts"
import { cn } from "akasha/design/interfaces/primitives/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interfaces/primitives/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interfaces/primitives/surface-provider/surface-provider.module.code.tsx"
import { deriveIndicatorChips } from "../idle-display/idle-display.module.code.ts"

export function ActiveBoosts({ state }: { state: GameState }) {
  const surface = useSurface()
  const live = deriveIndicatorChips(state)
    .filter((c) => c.live)
    .toSorted((a, b) => a.name.localeCompare(b.name))
  if (live.length === 0) {
    return null
  }
  return (
    <div className="active-boosts">
      <span className="active-boosts-label">Active Boosts</span>
      <div className="indicators">
        {live.map((chip) => (
          <span key={chip.key} className={cn("ind live", surfaceClass(surface + 1))}>
            {`${chip.name} ×${chip.mult.toFixed(2)}${chip.detail !== undefined ? ` · ${chip.detail}` : ""}`}
          </span>
        ))}
      </div>
    </div>
  )
}
