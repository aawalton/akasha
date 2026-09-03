import type { FileProperty } from "@akasha/pages-system/file-property"

export type DesignEntries = "jsonl"

export const designEntries = {
  id: "01a0673e-1000-7002-b433-9d61c2ba0733",
  pageTypeSlug: "file-property",
  slug: "design-entries",
  propertySlug: "design-entries",
  definition: "the decisions a game's design rests on",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One row is one json object on one line.",
    },
  ],
} as const satisfies FileProperty
