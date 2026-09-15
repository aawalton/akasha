import type { PersonAuthority } from "akasha/person/authority/person-authority.page-type.types.ts"

export const kiPageSchemaKi = {
  id: "01a05433-f108-7b3e-b96e-bf32f9bf688f",
  type: "page-type/person-authority",
  slug: "ki-page-schema-ki",
  person: "person/ki",
  authorityKind: "authority-kind/page-schema",
  target: "ki-*",
} as const satisfies PersonAuthority
