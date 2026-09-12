import type { ActiveTurn } from "akasha/agents/seats/properties/active-turn.boolean-property.types.ts"
import type { OpenShells } from "akasha/agents/seats/properties/open-shells.text-property.types.ts"
import type { ScannedTo } from "akasha/agents/seats/properties/scanned-to.number-property.types.ts"

export type TurnWorking = {
  activeTurn: ActiveTurn
  scannedTo: ScannedTo
  openShells: OpenShells
}
