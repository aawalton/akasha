import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const entryWrittenBy = {
  id: "01a0d970-b209-7b6e-85fe-46e639d56b8f",
  type: "page-type/relation-property",
  slug: "entry-written-by",
  propertySlug: "written-by",
  definition: "the module whose code alone writes an entry property's rows",
  targetPageType: "page-type/module",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry property naming a module has that module alone write its rows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A general writer handed rows for that property refuses them and names the module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry property naming no module has its rows written by any writer.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
