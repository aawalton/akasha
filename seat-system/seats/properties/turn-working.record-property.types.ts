import type { ActiveTurn } from "akasha/seat-system/seats/properties/active-turn.boolean-property.types.ts"
import type { OpenShells } from "akasha/seat-system/seats/properties/open-shells.text-property.types.ts"
import type { ScannedTo } from "akasha/seat-system/seats/properties/scanned-to.number-property.types.ts"

export type TurnWorking = {
  activeTurn: ActiveTurn
  scannedTo: ScannedTo
  openShells: OpenShells
}
