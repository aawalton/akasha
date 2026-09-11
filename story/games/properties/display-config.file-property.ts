import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const displayConfig = {
  id: "01a0673c-8e0e-700f-813a-482c5cf6d89d",
  type: "file-property",
  slug: "display-config",
  propertySlug: "display-config",
  definition: "what a game shows the player and how often",
  extensions: ["json"],
  types: "ts",
} as const satisfies FileProperty
