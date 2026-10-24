import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypePersona = {
  id: "01a16f7d-1338-7064-b406-2d0b904be6c8",
  type: "page-type/person-access",
  slug: "jenny-page-type-persona",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "persona",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "claudius" },
  createdAt: "2026-10-24T19:57:10.327Z",
  updatedAt: "2026-10-24T19:57:10.327Z",
} as const satisfies PersonAccess
