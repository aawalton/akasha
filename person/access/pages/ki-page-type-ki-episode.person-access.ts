import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const kiPageTypeKiEpisode = {
  id: "01a05433-f104-721c-acb4-2e62a1cdd395",
  type: "page-type/person-access",
  slug: "ki-page-type-ki-episode",
  person: "person/ki",
  accessKind: "access-kind/page-type",
  target: "ki-episode",
  deed: ["access-deed/read", "access-deed/write"],
  serves: "page-type/episode",
} as const satisfies PersonAccess
