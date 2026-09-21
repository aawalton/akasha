import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWorldEnchantment = {
  id: "01a0c5f8-1611-70c0-959e-5db0196627f3",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-world-enchantment",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "world-enchantment",
  deed: ["access-deed/read-some"],
  narrow: { key: "world", is: "world/the-wandering-inn" },
} as const satisfies PersonAccess
