import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const wikiKind = {
  id: "01a06577-f385-7cda-a112-1e8887344a93",
  type: "select-property",
  slug: "wiki-kind",
  propertySlug: "kind",
  definition: "what a wiki entry is about",
  values: ["character", "location", "relationship", "seed", "system"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seed is a thing the story has set up rather than a thing the story has.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
