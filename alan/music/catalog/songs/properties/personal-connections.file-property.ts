import type { FileProperty } from "@akasha/pages-system/file-property"

export type PersonalConnections = "txt"

export const personalConnections = {
  id: "01a06243-144b-700f-b1f1-f451fef5d1a4",
  pageTypeSlug: "file-property",
  slug: "personal-connections",
  propertySlug: "personal-connections",
  definition: "what a song is tied to in Alan's own life",
} as const satisfies FileProperty
