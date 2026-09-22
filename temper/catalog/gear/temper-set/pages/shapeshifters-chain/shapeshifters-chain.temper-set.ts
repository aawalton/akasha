import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const shapeshiftersChain = {
  id: "019e6484-6038-73fd-b041-0c8aeba7a231",
  type: "page-type/temper-set",
  slug: "shapeshifters-chain",
  title: "Shapeshifter's Chain",
  key: "shapeshifters-chain",
  esoSetId: 597,
  category: "temper-set-category/mythic",
  valid: ["necklace"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
