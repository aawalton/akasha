import type { PersonAuthority } from "akasha/person/authority/person-authority.page-type.types.ts"

export const alanPageSchemaAll = {
  id: "01a05433-f107-7219-bd13-6b570031b7dc",
  type: "page-type/person-authority",
  slug: "alan-page-schema-all",
  person: "person/alan",
  authorityKind: "authority-kind/page-schema",
  target: "all",
} as const satisfies PersonAuthority
