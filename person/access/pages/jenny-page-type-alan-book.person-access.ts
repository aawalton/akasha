import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeAlanBook = {
  id: "01a16f4b-ccca-7ac6-9b77-d8fa56799e81",
  type: "page-type/person-access",
  slug: "jenny-page-type-alan-book",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "alan-book",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "alan-and-jenny" },
  createdAt: "2026-10-24T19:03:21.033Z",
  updatedAt: "2026-10-24T19:03:21.033Z",
} as const satisfies PersonAccess
