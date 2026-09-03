import type { FileProperty } from "@akasha/pages-system/file-property"

export type States = "jsonl"

export const states = {
  id: "01a0673c-8e0e-7016-9a4f-051e3200a488",
  pageTypeSlug: "file-property",
  slug: "states",
  propertySlug: "states",
  definition: "what a game's world has stood at, sitting by sitting",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One row is one json object on one line.",
    },
  ],
} as const satisfies FileProperty
