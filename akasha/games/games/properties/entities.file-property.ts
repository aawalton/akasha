import type { FileProperty } from "@akasha/pages-system/file-property"

export type Entities = "jsonl"

export const entities = {
  id: "01a0673c-8e0e-7015-a3a2-7c0b31e1cbde",
  pageTypeSlug: "file-property",
  slug: "entities",
  propertySlug: "entities",
  definition: "everyone and everything standing in a game's world",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One row is one json object on one line.",
    },
  ],
} as const satisfies FileProperty
