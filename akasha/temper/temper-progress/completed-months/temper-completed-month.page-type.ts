import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperProgressThing } from "../progress-things/temper-progress-thing.page-type.ts"
import type { Month } from "./properties/month.text-property.ts"
import type { Tasks } from "./properties/tasks.page-property-entry.ts"

export type TemperCompletedMonth = TemperProgressThing & {
  month: Month
  tasks: Tasks
}

export const temperCompletedMonth = {
  id: "01a05fd3-4362-76d2-9884-52efa5c320b7",
  pageTypeSlug: "page-type",
  slug: "temper-completed-month",
  definition: "one month of tasks already marked done",
  pluralSlug: "temper-completed-months",
  extendsSlug: "page-type/temper-progress-thing",
  partSlugs: [
    "instant-property/completed-at",
    "page-property-entry/tasks",
    "text-property/link",
    "text-property/month",
    "text-property/task",
  ],
  properties: [
    { pagePropertySlug: "month", required: true, many: false },
    { pagePropertySlug: "tasks", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A completion falls in the month the completion was marked in.",
    },
    {
      invariantKind: "departure",
      statement: "A month closed is written once and left alone.",
    },
  ],
} as const satisfies PageType
