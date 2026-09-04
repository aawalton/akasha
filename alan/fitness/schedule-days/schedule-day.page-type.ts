import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { DayOfWeek } from "./properties/day-of-week.select-property.ts"
import type { Focus } from "./properties/focus.select-property.ts"
import type { ScheduleSlug } from "./properties/schedule-slug.relation-property.ts"

export type ScheduleDay = Page & {
  title: Title
  dayOfWeek: DayOfWeek
  focus: Focus
  scheduleSlug: ScheduleSlug
}

export const scheduleDay = {
  id: "01a0657a-e62d-71ab-9830-6a438684618d",
  pageTypeSlug: "page-type",
  slug: "schedule-day",
  definition: "one day of a training rotation, and what it trains",
  pluralSlug: "schedule-days",
  extendsSlug: "page-type/page",
  partSlugs: [
    "relation-property/schedule-slug",
    "select-property/day-of-week",
    "select-property/focus",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "day-of-week", required: true, many: false },
    { pagePropertySlug: "focus", required: true, many: false },
    { pagePropertySlug: "schedule-slug", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A day names the schedule it belongs to.",
    },
    {
      invariantKind: "absence",
      statement: "A schedule lists no day of its own.",
    },
  ],
} as const satisfies PageType
