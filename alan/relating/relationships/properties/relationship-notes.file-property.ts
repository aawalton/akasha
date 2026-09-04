import type { FileProperty } from "@akasha/pages-system/file-property"

export type RelationshipNotes = "txt"

export const relationshipNotes = {
  id: "01a06594-c6e2-7d44-a549-fae292dd4009",
  pageTypeSlug: "file-property",
  slug: "relationship-notes",
  propertySlug: "relationship-notes",
  definition: "what Alan keeps written about this person",
} as const satisfies FileProperty
