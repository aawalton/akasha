import type { PersonAuthority } from "akasha/person/authority/person-authority.page-type.types.ts"

export const kiPageDataKi = {
  id: "01a05433-f108-759f-9f3e-02d7fefd2a74",
  type: "person-authority",
  slug: "ki-page-data-ki",
  person: "person/ki",
  authorityKind: "authority-kind/page-data",
  target: "ki-*",
} as const satisfies PersonAuthority
