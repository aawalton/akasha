import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
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
  trims?: Trims
}

export const carMake = {
  id: "01a0659e-e27a-7b1f-bb44-5601b4fc9699",
  pageTypeSlug: "page-type",
  slug: "car-make",
  definition: "a company that builds cars",
  pluralSlug: "car-makes",
  extendsSlug: "page-type/car",
  partSlugs: [
    "file-property/trims",
    "number-property/founding-year",
    "text-property/charging-network-access",
    "text-property/country",
    "text-property/drm-policy",
    "text-property/electrification-strategy",
    "text-property/kill-switch-policy",
    "text-property/nacs-adoption",
    "text-property/parent-corporation",
    "text-property/reliability-notes",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "charging-network-access", required: true, many: false },
    { pagePropertySlug: "country", required: true, many: false },
    { pagePropertySlug: "drm-policy", required: true, many: false },
    { pagePropertySlug: "electrification-strategy", required: true, many: false },
    { pagePropertySlug: "founding-year", required: true, many: false },
    { pagePropertySlug: "kill-switch-policy", required: true, many: false },
    { pagePropertySlug: "nacs-adoption", required: true, many: false },
    { pagePropertySlug: "parent-corporation", required: true, many: false },
    { pagePropertySlug: "reliability-notes", required: true, many: false },
    { pagePropertySlug: "trims", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "A make names no model it builds.",
    },
  ],
} as const satisfies PageType
