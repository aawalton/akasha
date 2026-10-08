import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeViewWorldEnchantment = {
  id: "01a0c954-1073-70ee-9a60-0a54ce967efb",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view-world-enchantment",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/world-enchantment" },
  createdAt: "2026-09-22T13:35:24.787Z",
  updatedAt: "2026-09-22T13:35:27.000Z",
} as const satisfies PersonAccess
