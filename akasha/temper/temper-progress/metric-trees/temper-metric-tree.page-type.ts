import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperProgressThing } from "../progress-things/temper-progress-thing.page-type.ts"
import type { IncludeInChildAggregates } from "./properties/include-in-child-aggregates.boolean-property.ts"
import type { NodeType } from "./properties/node-type.text-property.ts"
import type { UseAccentColor } from "./properties/use-accent-color.boolean-property.ts"

export type TemperMetricTree = TemperProgressThing & {
  nodeType: NodeType
  includeInChildAggregates?: IncludeInChildAggregates
  useAccentColor?: UseAccentColor
}

export const temperMetricTree = {
  id: "01a05fcb-d656-7ea2-a494-28d13d70536e",
  pageTypeSlug: "page-type",
  slug: "temper-metric-tree",
  definition: "one node of the tree of numbers a build is measured by",
  pluralSlug: "temper-metric-trees",
  extendsSlug: "page-type/temper-progress-thing",
  partSlugs: [
    "boolean-property/include-in-child-aggregates",
    "boolean-property/use-accent-color",
    "text-property/node-type",
  ],
  properties: [
    { pagePropertySlug: "node-id", required: true, many: false },
    { pagePropertySlug: "node-type", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
    { pagePropertySlug: "include-in-child-aggregates", required: false, many: false },
    { pagePropertySlug: "use-accent-color", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A node stating no parent is a root of the tree.",
    },
    {
      invariantKind: "departure",
      statement: "A node of type `metric` is what the catalog names by `metric-id`.",
    },
    {
      invariantKind: "departure",
      statement: "The slug is the node type and the node id joined by a hyphen.",
    },
  ],
} as const satisfies PageType
