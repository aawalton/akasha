import type { PersonAccess } from "akasha/persons/accesses/person-access.page-type.types.ts"

export const kiPageTypeKiEpisode = {
  id: "01a05433-f104-721c-acb4-2e62a1cdd395",
  type: "person-access",
  slug: "ki-page-type-ki-episode",
  person: "ki",
  accessKind: "page-type",
  target: "ki-episode",
  serves: "episode",
} as const satisfies PersonAccess
