import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const anonymousPageTypeNav = {
  id: "01a0c52d-315f-727f-b726-4ecc733cd77b",
  type: "page-type/person-access",
  slug: "anonymous-page-type-nav",
  person: "person/anonymous",
  accessKind: "access-kind/page-type",
  target: "nav",
  deed: ["access-deed/read-some"],
  narrow: { key: "app", is: "web-app/alanwalton-requests-web" },
} as const satisfies PersonAccess
