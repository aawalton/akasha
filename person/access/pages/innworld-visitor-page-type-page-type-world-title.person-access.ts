import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorldTitle = {
  id: "01a0c5f7-bc64-738b-99be-2e46ca3a1397",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world-title",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world-title" },
} as const satisfies PersonAccess
