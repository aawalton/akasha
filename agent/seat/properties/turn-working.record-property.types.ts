import type { ActiveTurn } from "akasha/agent/seat/properties/active-turn.boolean-property.types.ts"
import type { OpenShells } from "akasha/agent/seat/properties/open-shells.text-property.types.ts"
import type { ScannedTo } from "akasha/agent/seat/properties/scanned-to.number-property.types.ts"

export type TurnWorking = {
  activeTurn: ActiveTurn
  scannedTo: ScannedTo
  openShells: OpenShells
}
