import type { FileProperty } from "@akasha/pages-system/file-property"

export type Rolls = "jsonl"

export const rolls = {
  id: "01a0673c-8e0e-7017-be58-4c9c920c8a5f",
  pageTypeSlug: "file-property",
  slug: "rolls",
  propertySlug: "rolls",
  definition: "every roll a game has settled an action by",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One row is one json object on one line.",
    },
  ],
} as const satisfies FileProperty
