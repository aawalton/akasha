import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const metalsMerchant = {
  id: "01a0657e-13a2-7bc8-a772-e42e2c9beca6",
  type: "world-class",
  slug: "metals-merchant",
  title: "Metals Merchant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
