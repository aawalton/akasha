import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const anonymousPageTypeView = {
  id: "01a0c52d-315f-7f71-8ca4-5cec802058ef",
  type: "page-type/person-access",
  slug: "anonymous-page-type-view",
  person: "person/anonymous",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read"],
  narrow: { key: "nav", is: "nav/requests" },
} as const satisfies PersonAccess
