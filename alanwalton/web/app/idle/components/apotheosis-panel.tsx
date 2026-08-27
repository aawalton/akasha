import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { cn } from "@shared/design-primitives/utils/cn"
import { ErrorMessage } from "~/idle/components/error-message"
import type { GameState } from "../lib/core/types"
import { deriveApotheosisView } from "~/idle/lib/display"
import type { IdleActions } from "~/idle/lib/use-idle-actions"

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
