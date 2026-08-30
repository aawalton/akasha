import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const personSystem = {
  id: "01a053e0-6cf6-7ff5-b070-19e936336f59",
  pageTypeSlug: "domain",
  slug: "person-system",
  definition: "a human this system reaches, and what serving them takes",
  partSlugs: [
    "page-type/access-kind",
    "page-type/authority-kind",
    "page-type/person",
    "page-type/person-access",
    "page-type/person-authority",
  ],
} as const satisfies Domain
