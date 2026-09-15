import type { ChargingNetworkAccess } from "akasha/alan/car-research/car-make/properties/charging-network-access.text-property.types.ts"
import type { Country } from "akasha/alan/car-research/car-make/properties/country.text-property.types.ts"
import type { DrmPolicy } from "akasha/alan/car-research/car-make/properties/drm-policy.text-property.types.ts"
import type { ElectrificationStrategy } from "akasha/alan/car-research/car-make/properties/electrification-strategy.text-property.types.ts"
import type { FoundingYear } from "akasha/alan/car-research/car-make/properties/founding-year.number-property.types.ts"
import type { KillSwitchPolicy } from "akasha/alan/car-research/car-make/properties/kill-switch-policy.text-property.types.ts"
import type { NacsAdoption } from "akasha/alan/car-research/car-make/properties/nacs-adoption.text-property.types.ts"
import type { ParentCorporation } from "akasha/alan/car-research/car-make/properties/parent-corporation.text-property.types.ts"
import type { ReliabilityNotes } from "akasha/alan/car-research/car-make/properties/reliability-notes.text-property.types.ts"
import type { Trims } from "akasha/alan/car-research/car-make/properties/trims.file-property.types.ts"
import type { Car } from "akasha/alan/car-research/car/car.page-type.types.ts"

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
