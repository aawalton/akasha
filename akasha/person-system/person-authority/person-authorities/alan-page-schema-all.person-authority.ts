import type { PersonAuthority } from "../person-authority.page-type.ts"

export const alanPageSchemaAll = {
  id: "01a05433-f107-7219-bd13-6b570031b7dc",
  pageTypeSlug: "person-authority",
  slug: "alan-page-schema-all",
  personAuthorityPersonSlug: "alan",
  personAuthorityKind: "page-schema",
  personAuthorityTarget: "all",
} as const satisfies PersonAuthority
