import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const designEntries = {
  id: "01a0673e-1000-7002-b433-9d61c2ba0733",
  type: "file-property",
  slug: "design-entries",
  propertySlug: "design-entries",
  definition: "the decisions a game's design rests on",
  extensions: ["jsonl"],
  types: "ts",
} as const satisfies FileProperty
