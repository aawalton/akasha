import type { TemperBuffMajor } from "../../temper-buff-major.page-type.ts"

export const majorEndurance = {
  id: "01a05fc5-f6b8-756e-9abd-f9500dbacd07",
  pageTypeSlug: "temper-buff-major",
  slug: "major-endurance",
  title: "Major Endurance",
  key: "major-endurance",
  description: "Increases Stamina Recovery by 30%",
  effects: "jsonl",
} as const satisfies TemperBuffMajor
