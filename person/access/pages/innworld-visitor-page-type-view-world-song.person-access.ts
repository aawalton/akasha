import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeViewWorldSong = {
  id: "01a0c954-12ec-72b2-9dd2-2e9336b99d97",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view-world-song",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/world-song" },
} as const satisfies PersonAccess
