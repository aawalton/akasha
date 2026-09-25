import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeNav = {
  id: "01a0d922-58fd-7285-a1d8-732282c4face",
  type: "page-type/person-access",
  slug: "jenny-page-type-nav",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "nav",
  deed: ["access-deed/read-some"],
  narrow: { key: "app", is: "web-app/smilingjenny-web" },
} as const satisfies PersonAccess
