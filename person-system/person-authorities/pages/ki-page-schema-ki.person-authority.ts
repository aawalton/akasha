import type { PersonAuthority } from "../person-authority.page-type.ts"

export const kiPageSchemaKi = {
  id: "01a05433-f108-7b3e-b96e-bf32f9bf688f",
  pageTypeSlug: "person-authority",
  slug: "ki-page-schema-ki",
  personSlug: "ki",
  authorityKind: "page-schema",
  target: "ki-*",
} as const satisfies PersonAuthority
