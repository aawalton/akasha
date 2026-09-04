import type { FileProperty } from "@akasha/pages-system/file-property"

export type LoreEntries = "jsonl"

export const loreEntries = {
  id: "01a0673e-1000-7001-8f22-77c4a1e05522",
  pageTypeSlug: "file-property",
  slug: "lore-entries",
  propertySlug: "lore-entries",
  definition: "what a game has settled as true in its world",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One row is one json object on one line.",
    },
  ],
} as const satisfies FileProperty
