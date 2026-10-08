import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeViewWorldAspect = {
  id: "01a0c954-0ec1-75bc-aead-fc1872742a69",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view-world-aspect",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/world-aspect" },
  createdAt: "2026-09-22T13:35:24.353Z",
  updatedAt: "2026-09-22T13:35:27.000Z",
} as const satisfies PersonAccess
