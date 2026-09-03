import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../temper/temper-things/properties/title.text-property.ts"
import type { Car } from "../cars/car.page-type.ts"
import type { ChargingNetworkAccess } from "./properties/chargingNetworkAccess.text-property.ts"
import type { Country } from "./properties/country.text-property.ts"
import type { DrmPolicy } from "./properties/drmPolicy.text-property.ts"
import type { ElectrificationStrategy } from "./properties/electrificationStrategy.text-property.ts"
import type { FoundingYear } from "./properties/foundingYear.number-property.ts"
import type { KillSwitchPolicy } from "./properties/killSwitchPolicy.text-property.ts"
import type { NacsAdoption } from "./properties/nacsAdoption.text-property.ts"
import type { ParentCorporation } from "./properties/parentCorporation.text-property.ts"
import type { ReliabilityNotes } from "./properties/reliabilityNotes.text-property.ts"

export type CarMake = Car & {
  title: Title
  chargingNetworkAccess: ChargingNetworkAccess
  country: Country
  drmPolicy: DrmPolicy
  electrificationStrategy: ElectrificationStrategy
  foundingYear: FoundingYear
  killSwitchPolicy: KillSwitchPolicy
  nacsAdoption: NacsAdoption
  parentCorporation: ParentCorporation
  reliabilityNotes: ReliabilityNotes
}

export const carMake = {
  id: "01a06598-aa7b-7936-ba33-b8068e9c42c5",
  pageTypeSlug: "page-type",
  slug: "car-make",
  definition: "a company that builds cars",
  pluralSlug: "car-makes",
  extendsSlug: "page-type/car",
  partSlugs: [
    "number-property/foundingYear",
    "text-property/chargingNetworkAccess",
    "text-property/country",
    "text-property/drmPolicy",
    "text-property/electrificationStrategy",
    "text-property/killSwitchPolicy",
    "text-property/nacsAdoption",
    "text-property/parentCorporation",
    "text-property/reliabilityNotes",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "chargingNetworkAccess", required: true, many: false },
    { pagePropertySlug: "country", required: true, many: false },
    { pagePropertySlug: "drmPolicy", required: true, many: false },
    { pagePropertySlug: "electrificationStrategy", required: true, many: false },
    { pagePropertySlug: "foundingYear", required: true, many: false },
    { pagePropertySlug: "killSwitchPolicy", required: true, many: false },
    { pagePropertySlug: "nacsAdoption", required: true, many: false },
    { pagePropertySlug: "parentCorporation", required: true, many: false },
    { pagePropertySlug: "reliabilityNotes", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "A make names no model it builds.",
    },
  ],
} as const satisfies PageType
