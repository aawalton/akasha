import type { FileProperty } from "@akasha/pages-system/file-property"

export type DisplayConfig = "json"

export const displayConfig = {
  id: "01a0673c-8e0e-700f-813a-482c5cf6d89d",
  pageTypeSlug: "file-property",
  slug: "display-config",
  propertySlug: "display-config",
  definition: "what a game shows the player and how often",
} as const satisfies FileProperty
