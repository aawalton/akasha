import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { cn } from "@shared/design-primitives/utils/cn"
import { ErrorMessage } from "~/idle/components/error-message"
import type { GameState } from "../lib/core/types"
import { deriveLegacyPerksView } from "~/idle/lib/display"
import { formatShortNumber as fmt } from "@shared/pages-core/property-types/number"
import type { IdleActions } from "~/idle/lib/use-idle-actions"

export function LegacyPerksPanel({ state, actions }: { state: GameState; actions: IdleActions }) {
  const surface = useSurface()
  const chipClass = surfaceClass(surface + 1)
  const view = deriveLegacyPerksView(state)
  if (view === null) {
    return null
  }
  return (
    <div className="prestige-sub perks">
      <div className="prestige-sub-head">
        Legacy Perks <span className="perks-pts">{fmt(view.points)} pts</span>
      </div>
      <div className="perks-row">
        {view.perks.map((perk) => {
          const key = `perk:${perk.id}`
          const error = actions.error?.key === key ? actions.error : null
          const label = perk.owned
            ? `${perk.name} +${perk.pct}% ✓`
            : `${perk.name} +${perk.pct}% (${fmt(perk.cost)})`
          if (perk.owned) {
            return (
              <span key={perk.id} className={cn("perk-buy owned", chipClass)}>
                {label}
              </span>
            )
          }
          return (
            <div key={perk.id} className="flex flex-col items-start gap-0.5">
              <button
                type="button"
                className={cn("perk-buy", chipClass)}
                onClick={() => actions.perk(perk.id)}
                disabled={!perk.affordable}
              >
                {label}
              </button>
              <ErrorMessage reason={error?.reason} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
