import type { Domain } from "../../domains/domain.page-type.ts"
import type { PageType } from "../../pages/types/page-type.page-type.ts"
import type { LifetimePoints } from "./properties/lifetime-points.number-property.ts"
import type { PointUnit } from "./properties/point-unit.text-property.ts"

export type Attribute = Domain & {
  pointUnit: PointUnit
  lifetimePoints: LifetimePoints
}

export const attribute = {
  id: "01a06841-a0fd-7d6d-83ba-fed205a8f26a",
  pageTypeSlug: "page-type",
  slug: "attribute",
  definition: "a capacity Alan builds through a daily habit",
  pluralSlug: "attributes",
  extendsSlug: ["page-type/domain"],
  partSlugs: [
    "attribute/charisma",
    "attribute/constitution",
    "attribute/endurance",
    "attribute/intelligence",
    "attribute/luck",
    "attribute/strength",
    "attribute/wisdom",
    "number-property/lifetime-points",
    "text-property/point-unit",
  ],
  properties: [
    { pagePropertySlug: "point-unit", required: true, many: false },
    { pagePropertySlug: "lifetime-points", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "What earns one point never changes.",
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
      statement: "Lifetime points never fall.",
    },
    {
      invariantKind: "departure",
      statement: "Recalibrating the daily target leaves what earns a point unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "An attribute shown as no daily light earns points all the same.",
    },
  ],
} as const satisfies PageType
