import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { EndDate } from "./properties/end-date.calendar-date-property.ts"
import type { LifeThemeParentSlug } from "./properties/life-theme-parent-slug.relation-property.ts"
import type { LifeThemeStatus } from "./properties/life-theme-status.select-property.ts"
import type { LifeThemeValueSlug } from "./properties/life-theme-value-slug.relation-property.ts"
import type { StartDate } from "./properties/start-date.calendar-date-property.ts"

export type LifeTheme = Page & {
  title: Title
  endDate?: EndDate
  lifeThemeParentSlug?: LifeThemeParentSlug
  startDate?: StartDate
  lifeThemeStatus: LifeThemeStatus
  lifeThemeValueSlug: LifeThemeValueSlug
}

export const lifeTheme = {
  id: "01a06575-c2c0-7479-ae1f-92956ac3d48e",
  pageTypeSlug: "page-type",
  slug: "life-theme",
  definition: "a stretch of Alan's life given over to one of his values",
  pluralSlug: "life-themes",
  extendsSlug: "page-type/page",
  partSlugs: [
    "calendar-date-property/end-date",
    "calendar-date-property/start-date",
    "relation-property/life-theme-parent-slug",
    "relation-property/life-theme-value-slug",
    "select-property/life-theme-status",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "end-date", required: false, many: false },
    { pagePropertySlug: "life-theme-parent-slug", required: false, many: false },
    { pagePropertySlug: "start-date", required: false, many: false },
    { pagePropertySlug: "life-theme-status", required: true, many: false },
    { pagePropertySlug: "life-theme-value-slug", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A life theme stands under one value.",
    },
    {
      invariantKind: "departure",
      statement: "A life theme stands under another life theme, or under none.",
    },
  ],
} as const satisfies PageType
