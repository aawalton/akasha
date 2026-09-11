import type { ChargingNetworkAccess } from "akasha/alan/car-research/car-makes/properties/charging-network-access.text-property.types.ts"
import type { Country } from "akasha/alan/car-research/car-makes/properties/country.text-property.types.ts"
import type { DrmPolicy } from "akasha/alan/car-research/car-makes/properties/drm-policy.text-property.types.ts"
import type { ElectrificationStrategy } from "akasha/alan/car-research/car-makes/properties/electrification-strategy.text-property.types.ts"
import type { FoundingYear } from "akasha/alan/car-research/car-makes/properties/founding-year.number-property.types.ts"
import type { KillSwitchPolicy } from "akasha/alan/car-research/car-makes/properties/kill-switch-policy.text-property.types.ts"
import type { NacsAdoption } from "akasha/alan/car-research/car-makes/properties/nacs-adoption.text-property.types.ts"
import type { ParentCorporation } from "akasha/alan/car-research/car-makes/properties/parent-corporation.text-property.types.ts"
import type { ReliabilityNotes } from "akasha/alan/car-research/car-makes/properties/reliability-notes.text-property.types.ts"
import type { Trims } from "akasha/alan/car-research/car-makes/properties/trims.file-property.types.ts"
import type { Car } from "akasha/alan/car-research/cars/car.page-type.types.ts"

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
