import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const armoredMerchant = {
  id: "01a0657e-1330-706a-9abd-df0c4212d596",
  type: "page-type/world-class",
  slug: "armored-merchant",
  title: "Armored Merchant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
