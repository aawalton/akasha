import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeNamedEvent = {
  id: "01a0c5f6-7a2d-7fc6-bf36-9895052cc1d6",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-named-event",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "named-event",
  deed: ["access-deed/read-some"],
  narrow: { key: "world", is: "world/the-wandering-inn" },
} as const satisfies PersonAccess
