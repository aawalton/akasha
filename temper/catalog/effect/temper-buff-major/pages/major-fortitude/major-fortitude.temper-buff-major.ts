import type { TemperBuffMajor } from "akasha/temper/catalog/effect/temper-buff-major/temper-buff-major.page-type.types.ts"

export const majorFortitude = {
  id: "01a05fc5-f6b9-7b48-829b-343e32458dad",
  type: "page-type/temper-buff-major",
  slug: "major-fortitude",
  title: "Major Fortitude",
  key: "major-fortitude",
  description: "Increases Health Recovery by 30%",
  effects: "jsonl",
} as const satisfies TemperBuffMajor
