import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorld = {
  id: "01a0c5f6-fec4-797d-bbd5-46c4fb377596",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world" },
} as const satisfies PersonAccess
