import type { PersonAccess } from "../person-access.page-type.ts"

export const kiPageTypeKiEpisode = {
  id: "01a05433-f104-721c-acb4-2e62a1cdd395",
  pageTypeSlug: "person-access",
  slug: "ki-page-type-ki-episode",
  personSlug: "ki",
  accessKind: "page-type",
  target: "ki-episode",
  serves: "episode",
} as const satisfies PersonAccess
