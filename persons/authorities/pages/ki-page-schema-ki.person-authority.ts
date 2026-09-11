import type { PersonAuthority } from "akasha/persons/authorities/person-authority.page-type.types.ts"

export const kiPageSchemaKi = {
  id: "01a05433-f108-7b3e-b96e-bf32f9bf688f",
  type: "person-authority",
  slug: "ki-page-schema-ki",
  person: "ki",
  authorityKind: "page-schema",
  target: "ki-*",
} as const satisfies PersonAuthority
