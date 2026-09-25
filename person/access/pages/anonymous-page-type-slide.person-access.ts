import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const anonymousPageTypeSlide = {
  id: "01a0d622-64e3-7d09-bf57-0b9a35ff0f9d",
  type: "page-type/person-access",
  slug: "anonymous-page-type-slide",
  person: "person/anonymous",
  accessKind: "access-kind/page-type",
  target: "slide",
  deed: ["access-deed/read"],
} as const satisfies PersonAccess
