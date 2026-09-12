import type { GameState } from "akasha/alan/harness/idle-system/idle-state/idle-state.module.code.ts"
import { deriveApotheosisView } from "akasha/alan/web/idle-display/idle-display.module.code.ts"
import { ErrorMessage } from "akasha/alan/web/idle-error-message/idle-error-message.module.code.tsx"
import type { IdleActions } from "akasha/alan/web/use-idle-actions/use-idle-actions.module.code.ts"
import { cn } from "akasha/design/interfaces/primitives/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interfaces/primitives/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interfaces/primitives/surface-provider/surface-provider.module.code.tsx"

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
