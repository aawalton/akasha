import type { TemperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.types.ts"

export const powerOfTheDaedra = {
  id: "01a15c97-852e-7def-a423-d719089a098a",
  type: "page-type/temper-buff-other",
  slug: "power-of-the-daedra",
  title: "Power of the Daedra",
  key: "power-of-the-daedra",
  effectCategory: "damage",
  description:
    "A Dark Anchor's buff, given as an Anchor Pinion's ability 46689 strikes, adding 10% damage done.",
  effects: "jsonl",
  createdAt: "2026-10-21T03:53:16.333Z",
  updatedAt: "2026-10-21T04:18:03.327Z",
} as const satisfies TemperBuffOther
