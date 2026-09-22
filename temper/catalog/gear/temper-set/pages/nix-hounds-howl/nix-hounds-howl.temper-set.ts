import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const nixHoundsHowl = {
  id: "019e66e6-a0a8-7bd3-94b5-d929f8fea3a9",
  type: "page-type/temper-set",
  slug: "nix-hounds-howl",
  title: "Nix-Hound's Howl",
  key: "nix-hounds-howl",
  esoSetId: 681,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
