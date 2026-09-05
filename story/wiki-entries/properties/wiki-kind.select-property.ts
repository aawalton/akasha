import type { SelectProperty } from "@akasha/pages-system/select-property"

export const wikiKind = {
  id: "01a06577-f385-7cda-a112-1e8887344a93",
  pageTypeSlug: "select-property",
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
} as const satisfies SelectProperty

export type WikiKind = (typeof wikiKind.values)[number]
