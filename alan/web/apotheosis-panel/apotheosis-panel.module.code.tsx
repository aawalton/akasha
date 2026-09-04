import { cn } from "@akasha/design-primitives/cn"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import type { GameState } from "@akasha/idle-system/state"
import { deriveApotheosisView } from "../idle-display/idle-display.module.code.ts"
import { ErrorMessage } from "../idle-error-message/idle-error-message.module.code.tsx"
import type { IdleActions } from "../use-idle-actions/use-idle-actions.module.code.ts"

export function ApotheosisPanel({ state, actions }: { state: GameState; actions: IdleActions }) {
  const surface = useSurface()
  const view = deriveApotheosisView(state)
  if (view === null) {
    return null
  }
  const error = actions.error?.key === "apotheosis" ? actions.error : null
  return (
    <div className="prestige-sub apotheosis">
      <div className="prestige-sub-head">
        Apotheosis <span className="apo-eternity">{view.eternity}</span>
      </div>
      <p className="apo-line">{view.line}</p>
      <div className="apo-actions">
        <button
          type="button"
          className={cn("apo-btn", surfaceClass(surface + 1))}
          onClick={() => actions.apotheosis()}
          disabled={view.available < 1}
        >
          {view.buttonLabel}
        </button>
      </div>
      <ErrorMessage reason={error?.reason} />
    </div>
  )
}
