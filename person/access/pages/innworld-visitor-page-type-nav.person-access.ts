import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeNav = {
  id: "01a0d922-58fc-7684-848a-617ce20bb6df",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-nav",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "nav",
  deed: ["access-deed/read-some"],
  narrow: { key: "app", is: "web-app/innworld-web" },
  createdAt: "2026-09-25T15:15:02.012Z",
  updatedAt: "2026-09-25T15:15:04.000Z",
} as const satisfies PersonAccess
