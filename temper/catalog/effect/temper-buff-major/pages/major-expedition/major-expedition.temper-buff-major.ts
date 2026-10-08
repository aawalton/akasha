import type { TemperBuffMajor } from "akasha/temper/catalog/effect/temper-buff-major/temper-buff-major.page-type.types.ts"

export const majorExpedition = {
  id: "01a05fc5-f6b8-76fe-a2ed-ed6749cdb7e9",
  type: "page-type/temper-buff-major",
  slug: "major-expedition",
  title: "Major Expedition",
  key: "major-expedition",
  description: "Increases movement speed by 30%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.408Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperBuffMajor
