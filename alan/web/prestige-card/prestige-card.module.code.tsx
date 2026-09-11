import type { GameState } from "akasha/alan/harness/idle-system/idle-state/idle-state.module.code.ts"
import { ApotheosisPanel } from "akasha/alan/web/apotheosis-panel/apotheosis-panel.module.code.tsx"
import {
  deriveApotheosisView,
  deriveLegacyPerksView,
} from "akasha/alan/web/idle-display/idle-display.module.code.ts"
import { LegacyPerksPanel } from "akasha/alan/web/legacy-perks-panel/legacy-perks-panel.module.code.tsx"
import type { IdleActions } from "akasha/alan/web/use-idle-actions/use-idle-actions.module.code.ts"
import { PanelCard } from "akasha/design/interfaces/layout/panel-card/panel-card.module.code.tsx"

export function PrestigeCard({ state, actions }: { state: GameState; actions: IdleActions }) {
  if (deriveLegacyPerksView(state) === null && deriveApotheosisView(state) === null) {
    return null
  }
  return (
    <PanelCard id="idle-prestige" title="Prestige">
      <div className="prestige">
        <LegacyPerksPanel state={state} actions={actions} />
        <ApotheosisPanel state={state} actions={actions} />
      </div>
    </PanelCard>
  )
}
