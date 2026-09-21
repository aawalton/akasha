import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorldItem = {
  id: "01a0c5f7-9111-7bb4-9153-91fbcef3a8e6",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world-item",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world-item" },
} as const satisfies PersonAccess
