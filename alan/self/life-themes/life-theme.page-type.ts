import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { EndDate } from "./properties/end-date.calendar-date-property.ts"
import type { LifeThemeParent } from "./properties/life-theme-parent.relation-property.ts"
import type { LifeThemeStatus } from "./properties/life-theme-status.select-property.ts"
import type { LifeThemeValue } from "./properties/life-theme-value.relation-property.ts"
import type { StartDate } from "./properties/start-date.calendar-date-property.ts"

export type LifeTheme = Page & {
  title: Title
  endDate?: EndDate
  lifeThemeParent?: LifeThemeParent
  startDate?: StartDate
  lifeThemeStatus: LifeThemeStatus
  lifeThemeValue: LifeThemeValue
}

export const lifeTheme = {
  id: "01a06575-c2c0-7479-ae1f-92956ac3d48e",
  pageTypeSlug: "page-type",
  slug: "life-theme",
  definition: "a stretch of Alan's life given over to one of his values",
  pluralSlug: "life-themes",
  extends: ["page-type/page"],
  partSlugs: [
    "calendar-date-property/end-date",
    "calendar-date-property/start-date",
    "relation-property/life-theme-parent",
    "relation-property/life-theme-value",
    "select-property/life-theme-status",
  ],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    { pagePropertySlug: "calendar-date-property/end-date", required: false, many: false },
    { pagePropertySlug: "relation-property/life-theme-parent", required: false, many: false },
    { pagePropertySlug: "calendar-date-property/start-date", required: false, many: false },
    { pagePropertySlug: "select-property/life-theme-status", required: true, many: false },
    { pagePropertySlug: "relation-property/life-theme-value", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A life theme is under one value.",
    },
    {
      invariantKind: "departure",
      statement: "A life theme is under another life theme or under no life theme.",
    },
  ],
} as const satisfies PageType
