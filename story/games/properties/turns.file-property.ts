import type { FileProperty } from "@akasha/pages-system/file-property"

export type Turns = "jsonl"

export const turns = {
  id: "01a0673c-8e0e-7014-8deb-3231aa6c6114",
  pageTypeSlug: "file-property",
  slug: "turns",
  propertySlug: "turns",
  definition: "every turn a game has been played through",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One row is one json object on one line.",
    },
  ],
} as const satisfies FileProperty
