import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedSpectralCloak = {
  id: "019e6484-5fc6-77a5-a884-a90aa67d7e92",
  type: "page-type/temper-set",
  slug: "perfected-spectral-cloak",
  title: "Perfected Spectral Cloak",
  key: "perfected-spectral-cloak",
  esoSetId: 425,
  category: "temper-set-category/arena",
  valid: ["sword", "axe", "mace", "dagger"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
