import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorldBoon = {
  id: "01a0c5f8-cb95-7bd8-9963-b234274d0653",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world-boon",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world-boon" },
} as const satisfies PersonAccess
