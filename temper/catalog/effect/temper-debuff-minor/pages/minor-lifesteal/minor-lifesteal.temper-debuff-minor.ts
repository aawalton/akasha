import type { TemperDebuffMinor } from "akasha/temper/catalog/effect/temper-debuff-minor/temper-debuff-minor.page-type.types.ts"

export const minorLifesteal = {
  id: "01a05fc6-42c4-777f-a74f-98f58996b458",
  type: "page-type/temper-debuff-minor",
  slug: "minor-lifesteal",
  title: "Minor Lifesteal",
  key: "minor-lifesteal",
  description: "Heals attackers for 600 Health when dealing damage",
  createdAt: "2026-09-02T01:40:23.876Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperDebuffMinor
