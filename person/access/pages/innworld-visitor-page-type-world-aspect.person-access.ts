import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWorldAspect = {
  id: "01a0c5f9-02b7-7b88-8a61-51951982c586",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-world-aspect",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "world-aspect",
  deed: ["access-deed/read-some"],
  narrow: { key: "world", is: "world/the-wandering-inn" },
} as const satisfies PersonAccess
