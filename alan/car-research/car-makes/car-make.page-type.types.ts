import type { Car } from "../cars/car.page-type.ts"
import type { ChargingNetworkAccess } from "./properties/charging-network-access.text-property.ts"
import type { Country } from "./properties/country.text-property.ts"
import type { DrmPolicy } from "./properties/drm-policy.text-property.ts"
import type { ElectrificationStrategy } from "./properties/electrification-strategy.text-property.ts"
import type { FoundingYear } from "./properties/founding-year.number-property.ts"
import type { KillSwitchPolicy } from "./properties/kill-switch-policy.text-property.ts"
import type { NacsAdoption } from "./properties/nacs-adoption.text-property.ts"
import type { ParentCorporation } from "./properties/parent-corporation.text-property.ts"
import type { ReliabilityNotes } from "./properties/reliability-notes.text-property.ts"
import type { Trims } from "./properties/trims.file-property.ts"

export type CarMake = Car & {
  chargingNetworkAccess: ChargingNetworkAccess
  country: Country
  drmPolicy: DrmPolicy
  electrificationStrategy: ElectrificationStrategy
  foundingYear: FoundingYear
  killSwitchPolicy: KillSwitchPolicy
  nacsAdoption: NacsAdoption
  parentCorporation: ParentCorporation
  reliabilityNotes: ReliabilityNotes
  trims?: Trims
}
