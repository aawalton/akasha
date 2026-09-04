import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Metric } from "../../../alan/tracking/daily/eso-days/properties/metric.text-property.ts"
import type { Title } from "../../../pages/pages/properties/title.text-property.ts"
import type { Scope } from "../../../temper/temper-progress/progress-things/properties/scope.text-property.ts"
import type { Description } from "../../../temper/temper-things/properties/description.text-property.ts"
import type { Threshold } from "./properties/threshold.number-property.ts"

export type CtwAchievement = Page & {
  title: Title
  scope: Scope
  metric: Metric
  threshold: Threshold
  description?: Description
}

export const ctwAchievement = {
  id: "01a06579-e4f7-7cac-8aa3-87b59725c97d",
  pageTypeSlug: "page-type",
  slug: "ctw-achievement",
  definition: "one mark a player of Clear the World earns by passing a threshold",
  pluralSlug: "ctw-achievements",
  extendsSlug: "page-type/page",
  runsTabooCheck: false,
  partSlugs: ["number-property/threshold", "text-property/metric"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "scope", required: true, many: false },
    { pagePropertySlug: "metric", required: true, many: false },
    { pagePropertySlug: "threshold", required: true, many: false },
    { pagePropertySlug: "description", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An achievement is earned when its metric reaches its threshold.",
    },
    {
      invariantKind: "departure",
      statement: "A scope says whose count the metric is read from.",
    },
    {
      invariantKind: "departure",
      statement: "A description tells the real mine action the mark is named for.",
    },
    {
      invariantKind: "departure",
      statement: "The prose here is quoted from the world rather than written to the taboo terms.",
    },
  ],
} as const satisfies PageType
