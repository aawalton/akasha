import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Date as TrackedDate } from "../../alan/tracking/daily/wake-days/properties/date.text-property.ts"
import type { Title } from "../../pages/pages/properties/title.text-property.ts"
import type { Icon } from "../../temper/temper-things/properties/icon.text-property.ts"
import type { ValueSlug } from "../personas/properties/value-slug.text-property.ts"
import type { AdvanceCount } from "./properties/advance-count.number-property.ts"
import type { CraftDayPersonaSlug } from "./properties/craft-day-persona-slug.relation-property.ts"
import type { GreenDay } from "./properties/green-day.number-property.ts"
import type { ImprovementCount } from "./properties/improvement-count.number-property.ts"
import type { NewPersonaCount } from "./properties/new-persona-count.number-property.ts"
import type { PersonasCraftedSlugs } from "./properties/personas-crafted-slugs.relation-property.ts"

export type PersonaCraftDay = Page & {
  title: Title
  personaSlug: CraftDayPersonaSlug
  date: TrackedDate
  valueSlug: ValueSlug
  icon?: Icon
  personasCraftedSlugs?: PersonasCraftedSlugs
  newPersonaCount?: NewPersonaCount
  improvementCount?: ImprovementCount
  advanceCount?: AdvanceCount
  greenDay?: GreenDay
}

export const personaCraftDay = {
  id: "01a0655b-4a9b-700e-86cf-9bc6a7104f89",
  pageTypeSlug: "page-type",
  slug: "persona-craft-day",
  definition: "what the persona who makes personas did on one day",
  pluralSlug: "persona-craft-days",
  extendsSlug: "page-type/page",
  partSlugs: [
    "number-property/advance-count",
    "number-property/green-day",
    "number-property/improvement-count",
    "number-property/new-persona-count",
    "relation-property/craft-day-persona-slug",
    "relation-property/personas-crafted-slugs",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "persona-slug", required: true, many: false },
    { pagePropertySlug: "date", required: true, many: false },
    { pagePropertySlug: "value-slug", required: true, many: false },
    { pagePropertySlug: "icon", required: false, many: false },
    { pagePropertySlug: "personas-crafted-slugs", required: false, many: true, max: null },
    { pagePropertySlug: "new-persona-count", required: false, many: false },
    { pagePropertySlug: "improvement-count", required: false, many: false },
    { pagePropertySlug: "advance-count", required: false, many: false },
    { pagePropertySlug: "green-day", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The persona named here is the one who did the crafting.",
    },
    {
      invariantKind: "departure",
      statement: "The personas crafted are named apart from her.",
    },
    {
      invariantKind: "departure",
      statement: "A craft day is slugged by the crafter and then the day.",
    },
  ],
} as const satisfies PageType
