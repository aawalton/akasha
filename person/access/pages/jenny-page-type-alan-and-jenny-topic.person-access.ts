import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeAlanAndJennyTopic = {
  id: "01a16f4b-ccca-73f9-ad74-748820078fd3",
  type: "page-type/person-access",
  slug: "jenny-page-type-alan-and-jenny-topic",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "alan-and-jenny-topic",
  deed: ["access-deed/read"],
  createdAt: "2026-10-24T19:03:21.033Z",
  updatedAt: "2026-10-24T19:03:21.033Z",
} as const satisfies PersonAccess
