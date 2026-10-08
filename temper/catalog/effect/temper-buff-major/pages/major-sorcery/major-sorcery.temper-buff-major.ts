import type { TemperBuffMajor } from "akasha/temper/catalog/effect/temper-buff-major/temper-buff-major.page-type.types.ts"

export const majorSorcery = {
  id: "01a05fc5-f6bc-7edc-a10c-5353f828d187",
  type: "page-type/temper-buff-major",
  slug: "major-sorcery",
  title: "Major Sorcery",
  key: "major-sorcery",
  effectCategory: "damage",
  description: "Increases Spell Damage by 20%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.412Z",
  updatedAt: "2026-09-26T18:25:50.000Z",
} as const satisfies TemperBuffMajor
