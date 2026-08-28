import { PanelCard } from "@shared/design-layout/components/panel-card"
import { ApotheosisPanel } from "~/idle/components/apotheosis-panel"
import { LegacyPerksPanel } from "~/idle/components/legacy-perks-panel"
import type { GameState } from "../lib/core/types"
import { deriveApotheosisView, deriveLegacyPerksView } from "~/idle/lib/display"
import type { IdleActions } from "~/idle/lib/use-idle-actions"

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
