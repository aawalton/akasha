import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWorldBoon = {
  id: "01a0c5f8-c021-7045-9a36-9898d268ea12",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-world-boon",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "world-boon",
  deed: ["access-deed/read-some"],
  narrow: { key: "world", is: "world/the-wandering-inn" },
} as const satisfies PersonAccess
