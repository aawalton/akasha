import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorldQuest = {
  id: "01a0c5f8-4d7f-73ab-8526-dfc6f10a58bd",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world-quest",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world-quest" },
} as const satisfies PersonAccess
