import { cn } from "@akasha/design-primitives/cn"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import type { GameState } from "@akasha/idle-system/state"
import { formatShortNumber as fmt } from "@akasha/pages-core/property-types/number"
import { deriveLegacyPerksView } from "../idle-display/idle-display.module.code.ts"
import { ErrorMessage } from "../idle-error-message/idle-error-message.module.code.tsx"
import type { IdleActions } from "../use-idle-actions/use-idle-actions.module.code.ts"

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
