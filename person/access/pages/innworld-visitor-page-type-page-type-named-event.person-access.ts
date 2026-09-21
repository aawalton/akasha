import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeNamedEvent = {
  id: "01a0c5f6-f46b-71d2-91eb-1f25ec3e15c9",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-named-event",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "named-event" },
} as const satisfies PersonAccess
