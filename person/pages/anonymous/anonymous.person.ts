import type { Person } from "akasha/person/person.page-type.types.ts"

export const anonymous = {
  id: "01a0c4ec-6424-770d-b7a0-51c67a9d63b7",
  type: "page-type/person",
  slug: "anonymous",
  definition: "the reader nobody signed in as",
  answeredBy: "persona/claude",
  createdAt: "2026-09-21T17:03:41.604Z",
  updatedAt: "2026-09-21T17:04:47.000Z",
} as const satisfies Person
