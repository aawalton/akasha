import type { TemperCompanionSkillLine } from "akasha/temper/catalog/companion/skill-line/temper-companion-skill-line.page-type.types.ts"

export const armorLight = {
  id: "01a05fce-c49d-7c29-aa65-daaf2026a17e",
  type: "page-type/temper-companion-skill-line",
  slug: "armor-light",
  key: "armor-light",
  title: "Light Armor",
  category: "armor",
  displayOrder: 42,
} as const satisfies TemperCompanionSkillLine
