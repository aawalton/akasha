import type { PersonAccess } from "../person-access.page-type.ts"

export const kiPageTypeKiEpisode = {
  id: "01a05433-f104-721c-acb4-2e62a1cdd395",
  pageTypeSlug: "person-access",
  slug: "ki-page-type-ki-episode",
  personAccessPersonSlug: "ki",
  personAccessKind: "page-type",
  personAccessTarget: "ki-episode",
  personAccessServes: "episode",
} as const satisfies PersonAccess
