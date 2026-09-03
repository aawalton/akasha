import { PanelCard } from "@akasha/design-layout/panel-card"
import type { GameState } from "@akasha/idle-system/state"
import { ApotheosisPanel } from "../apotheosis-panel/apotheosis-panel.module.code.tsx"
import {
  deriveApotheosisView,
  deriveLegacyPerksView,
} from "../idle-display/idle-display.module.code.ts"
import { LegacyPerksPanel } from "../legacy-perks-panel/legacy-perks-panel.module.code.tsx"
import type { IdleActions } from "../use-idle-actions/use-idle-actions.module.code.ts"

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
