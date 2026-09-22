import type { TemperCompanionSkillLine } from "akasha/temper/catalog/companion/skill-line/temper-companion-skill-line.page-type.types.ts"

export const companionIsobelHealingGrace = {
  id: "01a05fce-c4a3-7b1d-b45f-dc2c86c50684",
  type: "page-type/temper-companion-skill-line",
  slug: "companion-isobel-healing-grace",
  key: "companion-isobel-healing-grace",
  title: "Healing Grace",
  companionId: "temper-eso-companion/isobel",
  category: "class",
  displayOrder: 16,
} as const satisfies TemperCompanionSkillLine
