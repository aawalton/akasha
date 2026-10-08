import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeView = {
  id: "01a0c941-483d-7596-a092-904f42cd7b6f",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-view",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "view" },
  createdAt: "2026-09-22T13:14:53.885Z",
  updatedAt: "2026-09-22T13:14:58.000Z",
} as const satisfies PersonAccess
