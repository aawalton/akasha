import type { PageType } from "../../pages/types/page-type.page-type.types.ts"

export const attribute = {
  id: "01a06841-a0fd-7d6d-83ba-fed205a8f26a",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "attribute",
  definition: "a capacity Alan builds through a daily habit",
  pluralSlug: "attributes",
  extends: ["page-type/domain"],
  parts: [
    "module/attribute-points",
    "computed-property/attribute-level",
    "attribute/charisma",
    "attribute/constitution",
    "attribute/endurance",
    "attribute/intelligence",
    "attribute/luck",
    "attribute/strength",
    "attribute/wisdom",
    "number-property/points-before-today",
    "number-property/points-today",
    "number-property/points-total",
    "text-property/point-unit",
    "domain/attribute-readouts",
  ],
  properties: [
    { pageProperty: "code-file-property/code", required: false, many: false },
    { pageProperty: "code-file-property/test", required: false, many: false },
    { pageProperty: "text-property/point-unit", required: true, many: false },
    {
      pageProperty: "number-property/points-before-today",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "number-property/points-today",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "number-property/points-total",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pageProperty: "computed-property/attribute-level", required: false, many: false },
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
    {
      invariantKind: "departure",
      statement:
        "An attribute's total points and the level those points reach are carried on that attribute's page.",
    },
    {
      invariantKind: "departure",
      statement: "What earns an attribute its points is the code beside that attribute's page.",
    },
    {
      invariantKind: "departure",
      statement: "A readout counting an attribute reads that attribute's points off its page.",
    },
  ],
  types: "ts",
} as const satisfies PageType
