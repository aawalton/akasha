import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeViewNamedEvent = {
  id: "01a0c954-1403-7dc4-8358-bf8bb2bad338",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view-named-event",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/named-event" },
  createdAt: "2026-09-22T13:35:25.699Z",
  updatedAt: "2026-09-22T13:35:27.000Z",
} as const satisfies PersonAccess
