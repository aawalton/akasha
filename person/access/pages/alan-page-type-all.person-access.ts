import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const alanPageTypeAll = {
  id: "01a05433-f101-7950-b30b-bf9ea60da403",
  type: "page-type/person-access",
  slug: "alan-page-type-all",
  person: "person/alan",
  accessKind: "access-kind/page-type",
  target: "all",
  deed: ["access-deed/read", "access-deed/write"],
} as const satisfies PersonAccess
