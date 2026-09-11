import type { PersonAuthority } from "akasha/persons/authorities/person-authority.page-type.types.ts"

export const alanPageDataAll = {
  id: "01a05433-f106-71c5-8a0b-83070248d837",
  type: "person-authority",
  slug: "alan-page-data-all",
  person: "alan",
  authorityKind: "page-data",
  target: "all",
} as const satisfies PersonAuthority
