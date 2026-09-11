import type { PersonAccess } from "akasha/persons/accesses/person-access.page-type.types.ts"

export const kiPageTypeKiCollectionTemplate = {
  id: "01a05433-f104-7af1-9306-c61c5767839a",
  type: "person-access",
  slug: "ki-page-type-ki-collection-template",
  person: "ki",
  accessKind: "page-type",
  target: "ki-collection-template",
  serves: "collection",
} as const satisfies PersonAccess
