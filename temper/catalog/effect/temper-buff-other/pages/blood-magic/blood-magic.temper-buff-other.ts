import type { TemperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.types.ts"

export const bloodMagic = {
  id: "01a15688-49de-7b53-9a7d-8785fbeb4527",
  type: "page-type/temper-buff-other",
  slug: "blood-magic",
  title: "Blood Magic",
  key: "blood-magic",
  description:
    "The higher of your Max Magicka or Stamina is increased by 10% for 10 seconds after you cast a Dark Magic ability with a cost at full Health",
  effects: "jsonl",
  createdAt: "2026-10-19T23:38:54.813Z",
  updatedAt: "2026-10-19T23:38:54.813Z",
} as const satisfies TemperBuffOther
