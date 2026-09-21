import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorldEnchantment = {
  id: "01a0c5f8-2160-75c8-8c46-49ee8489ee6c",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world-enchantment",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world-enchantment" },
} as const satisfies PersonAccess
