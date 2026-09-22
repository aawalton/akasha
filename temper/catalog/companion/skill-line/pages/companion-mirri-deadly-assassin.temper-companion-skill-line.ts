import type { TemperCompanionSkillLine } from "akasha/temper/catalog/companion/skill-line/temper-companion-skill-line.page-type.types.ts"

export const companionMirriDeadlyAssassin = {
  id: "01a05fce-c4a4-7092-9bab-eda2fd3bf816",
  type: "page-type/temper-companion-skill-line",
  slug: "companion-mirri-deadly-assassin",
  key: "companion-mirri-deadly-assassin",
  title: "Deadly Assassin",
  companionId: "temper-eso-companion/mirri",
  category: "class",
  displayOrder: 10,
} as const satisfies TemperCompanionSkillLine
