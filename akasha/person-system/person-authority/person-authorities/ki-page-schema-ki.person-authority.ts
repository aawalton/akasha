import type { PersonAuthority } from "../person-authority.page-type.ts"

export const kiPageSchemaKi = {
  id: "01a05433-f108-7b3e-b96e-bf32f9bf688f",
  pageTypeSlug: "person-authority",
  slug: "ki-page-schema-ki",
  personAuthorityPersonSlug: "ki",
  personAuthorityKind: "page-schema",
  personAuthorityTarget: "ki-*",
} as const satisfies PersonAuthority
