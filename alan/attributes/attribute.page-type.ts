import type { Domain } from "../../domains/domain.page-type.ts"
import type { PageType } from "../../pages/types/page-type.page-type.ts"
import type { PointUnit } from "./properties/point-unit.text-property.ts"
import type { PointsToday } from "./properties/points-today.number-property.ts"
import type { PointsTotal } from "./properties/points-total.number-property.ts"

export type Attribute = Domain & {
  pointUnit: PointUnit
  pointsToday?: PointsToday
  pointsTotal?: PointsTotal
}

export const attribute = {
  id: "01a06841-a0fd-7d6d-83ba-fed205a8f26a",
  pageTypeSlug: "page-type",
  slug: "attribute",
  definition: "a capacity Alan builds through a daily habit",
  pluralSlug: "attributes",
  extendsSlug: ["page-type/domain"],
  partSlugs: [
    "computed-property/attribute-level",
    "attribute/charisma",
    "attribute/constitution",
    "attribute/endurance",
    "attribute/intelligence",
    "attribute/luck",
    "attribute/strength",
    "attribute/wisdom",
    "number-property/points-today",
    "number-property/points-total",
    "text-property/point-unit",
  ],
  properties: [
    { pagePropertySlug: "text-property/point-unit", required: true, many: false },
    { pagePropertySlug: "number-property/points-today", required: false, many: false },
    { pagePropertySlug: "number-property/points-total", required: false, many: false },
    { pagePropertySlug: "computed-property/attribute-level", required: false, many: false },
  ],
  worked: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An attribute's point unit never changes.",
    },
    {
      invariantKind: "departure",
      statement: "Points are counted forward from the day an attribute begins.",
    },
    {
      invariantKind: "departure",
      statement: "No earlier day is backfilled.",
    },
    {
      invariantKind: "departure",
      statement: "Recalibrating the daily target leaves an attribute's point unit unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "An attribute shown as no daily light earns points all the same.",
    },
  ],
} as const satisfies PageType
