import type { FileProperty } from "@akasha/pages/file-property"

export type GmContext = "json"

export const gmContext = {
  id: "01a0673c-8e0e-7010-99a7-12446729b57b",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "gm-context",
  propertySlug: "gm-context",
  definition: "the doctrine the game master has while running a game",
} as const satisfies FileProperty
