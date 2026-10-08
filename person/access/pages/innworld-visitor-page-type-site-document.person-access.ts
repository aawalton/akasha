import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeSiteDocument = {
  id: "01a0e2a3-3184-709b-a224-e766479d3532",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-site-document",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "site-document",
  deed: ["access-deed/read-some"],
  narrow: { key: "webApp", is: "web-app/innworld-web" },
  createdAt: "2026-09-27T11:32:20.996Z",
  updatedAt: "2026-09-27T11:32:33.000Z",
} as const satisfies PersonAccess
