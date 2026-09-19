import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const wikiKind = {
  id: "01a06577-f385-7cda-a112-1e8887344a93",
  type: "page-type/select-property",
  slug: "wiki-kind",
  propertySlug: "kind",
  definition: "what a wiki entry is about",
  values: ["character", "location", "relationship", "seed", "system"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seed is a thing the story has set up rather than a thing the story has.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
