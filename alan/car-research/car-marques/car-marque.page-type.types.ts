import type { ChargingNetworkAccess } from "akasha/alan/car-research/car-marques/properties/charging-network-access.text-property.types.ts"
import type { Country } from "akasha/alan/car-research/car-marques/properties/country.text-property.types.ts"
import type { DrmPolicy } from "akasha/alan/car-research/car-marques/properties/drm-policy.text-property.types.ts"
import type { ElectrificationStrategy } from "akasha/alan/car-research/car-marques/properties/electrification-strategy.text-property.types.ts"
import type { FoundingYear } from "akasha/alan/car-research/car-marques/properties/founding-year.number-property.types.ts"
import type { KillSwitchPolicy } from "akasha/alan/car-research/car-marques/properties/kill-switch-policy.text-property.types.ts"
import type { NacsAdoption } from "akasha/alan/car-research/car-marques/properties/nacs-adoption.text-property.types.ts"
import type { ParentCorporation } from "akasha/alan/car-research/car-marques/properties/parent-corporation.text-property.types.ts"
import type { ReliabilityNotes } from "akasha/alan/car-research/car-marques/properties/reliability-notes.text-property.types.ts"
import type { Trims } from "akasha/alan/car-research/car-marques/properties/trims.file-property.types.ts"
import type { Car } from "akasha/alan/car-research/cars/car.page-type.types.ts"

export type CarMarque = Car & {
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
