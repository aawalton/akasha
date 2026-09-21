import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorldCurse = {
  id: "01a0c5f8-89e1-7071-b180-5a39548db8f8",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world-curse",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world-curse" },
} as const satisfies PersonAccess
