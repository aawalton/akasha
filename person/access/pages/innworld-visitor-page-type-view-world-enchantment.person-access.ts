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
} as const satisfies PersonAccess
