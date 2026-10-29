import type { TemperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.types.ts"

export const puncturingRemedy = {
  id: "01a188b5-7d11-7988-bb19-8b43f6d2fdba",
  type: "page-type/temper-buff-other",
  slug: "puncturing-remedy",
  title: "Puncturing Remedy",
  key: "puncturing-remedy",
  description:
    "When you deal damage with Puncture, you heal and gain Spell and Physical Resistance equal to the amount of healing or over-healing done for 5 seconds. The healing scales off your Max Health. The amount granted is the healing and over-healing done, not a fixed number.",
  effects: "jsonl",
  createdAt: "2026-10-29T17:29:17.840Z",
  updatedAt: "2026-10-29T17:29:17.840Z",
} as const satisfies TemperBuffOther
