import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorldSong = {
  id: "01a0c5f8-b55e-7ed4-8135-3d55868802ad",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world-song",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world-song" },
} as const satisfies PersonAccess
