import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const mightyChudan = {
  id: "019e6484-6007-7c51-916f-a58010dfa650",
  type: "page-type/temper-set",
  slug: "mighty-chudan",
  title: "Mighty Chudan",
  key: "mighty-chudan",
  esoSetId: 256,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
