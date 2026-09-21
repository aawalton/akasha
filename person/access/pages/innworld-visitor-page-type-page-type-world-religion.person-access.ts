import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorldReligion = {
  id: "01a0c5f9-2309-780b-b3c4-fbc65fffa473",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world-religion",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world-religion" },
} as const satisfies PersonAccess
