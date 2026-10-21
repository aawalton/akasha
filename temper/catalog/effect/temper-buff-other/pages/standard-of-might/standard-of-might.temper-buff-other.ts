import type { TemperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.types.ts"

export const standardOfMight = {
  id: "01a15c8c-e0aa-7581-90c7-efa1ffa01b4d",
  type: "page-type/temper-buff-other",
  slug: "standard-of-might",
  title: "Standard of Might",
  key: "standard-of-might",
  effectCategory: "damage",
  description:
    "Being inside your own Standard of Might gives an additional 15% damage done, besides the Weapon and Spell Damage and reduced damage taken.",
  effects: "jsonl",
  createdAt: "2026-10-21T03:41:38.857Z",
  updatedAt: "2026-10-21T03:41:38.857Z",
} as const satisfies TemperBuffOther
