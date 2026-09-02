import type { TemperBuffMajor } from "../../temper-buff-major.page-type.ts"

export const majorHeroism = {
  id: "01a05fc5-f6ba-7967-abdb-a41f265522f0",
  pageTypeSlug: "temper-buff-major",
  slug: "major-heroism",
  title: "Major Heroism",
  key: "major-heroism",
  description: "Grants 3 Ultimate every 1.5 seconds",
  effects: "jsonl",
} as const satisfies TemperBuffMajor
