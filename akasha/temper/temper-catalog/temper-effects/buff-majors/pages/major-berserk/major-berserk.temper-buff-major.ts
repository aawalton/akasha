import type { TemperBuffMajor } from "../../temper-buff-major.page-type.ts"

export const majorBerserk = {
  id: "01a05fc5-f6b7-7ec9-992e-57834ce2780d",
  pageTypeSlug: "temper-buff-major",
  slug: "major-berserk",
  title: "Major Berserk",
  key: "major-berserk",
  description: "Increases damage done by 10%",
  effects: "jsonl",
} as const satisfies TemperBuffMajor
