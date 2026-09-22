import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const spectralCloak = {
  id: "019e6484-5fd4-7840-884d-84b28a30a91c",
  type: "page-type/temper-set",
  slug: "spectral-cloak",
  title: "Spectral Cloak",
  key: "spectral-cloak",
  esoSetId: 413,
  category: "temper-set-category/arena",
  valid: ["sword", "axe", "mace", "dagger"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
