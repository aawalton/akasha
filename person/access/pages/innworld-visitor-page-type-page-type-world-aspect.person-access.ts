import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorldAspect = {
  id: "01a0c5f9-0e3b-7f5d-83ae-bf78b9e4289c",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world-aspect",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world-aspect" },
  createdAt: "2026-09-21T21:57:08.795Z",
  updatedAt: "2026-09-21T21:57:50.000Z",
} as const satisfies PersonAccess
