import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { cn } from "@shared/design-primitives/utils/cn"
import type { GameState } from "../lib/core/types"
import { deriveIndicatorChips } from "~/idle/lib/display"

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
