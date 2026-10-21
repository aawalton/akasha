import type { TemperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.types.ts"

export const mercilessCharge = {
  id: "01a15e05-fc0e-731d-b677-3cc2687cf1aa",
  type: "page-type/temper-buff-other",
  slug: "merciless-charge",
  title: "Merciless Charge",
  key: "merciless-charge",
  effectCategory: "damage",
  description:
    "The Merciless Charge set's buff, ability 99789, given as Critical Charge is activated, adding up to 12% damage done. A reading's share is 1% for each 555.6 of the higher of Weapon and Spell Damage the buff first began at, as module onset-scaled-buff works it out.",
  effects: "jsonl",
  createdAt: "2026-10-21T10:33:32.942Z",
  updatedAt: "2026-10-21T10:56:52.078Z",
} as const satisfies TemperBuffOther
