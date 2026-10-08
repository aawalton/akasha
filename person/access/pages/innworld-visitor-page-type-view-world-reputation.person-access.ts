import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeViewWorldReputation = {
  id: "01a0c954-1255-7753-b653-0cac986a2c27",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view-world-reputation",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/world-reputation" },
  createdAt: "2026-09-22T13:35:25.269Z",
  updatedAt: "2026-09-22T13:35:27.000Z",
} as const satisfies PersonAccess
