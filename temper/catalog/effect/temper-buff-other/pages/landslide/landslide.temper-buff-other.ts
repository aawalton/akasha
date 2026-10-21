import type { TemperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.types.ts"

export const landslide = {
  id: "01a15c86-7f91-730d-90d7-073f294a6611",
  type: "page-type/temper-buff-other",
  slug: "landslide",
  title: "Landslide",
  key: "landslide",
  effectCategory: "damage",
  description:
    "The Dragonknight passive's stacking buff; the sheet shows 1% damage done at every stack count from 1 to 12.",
  effects: "jsonl",
  createdAt: "2026-10-21T03:34:40.784Z",
  updatedAt: "2026-10-21T03:34:40.784Z",
} as const satisfies TemperBuffOther
