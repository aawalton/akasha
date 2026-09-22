import type { TemperCompanionSkillLine } from "akasha/temper/catalog/companion/skill-line/temper-companion-skill-line.page-type.types.ts"

export const companionMirriSoulThief = {
  id: "01a05fce-c4a4-7c3d-83ba-7afdb37c7fbb",
  type: "page-type/temper-companion-skill-line",
  slug: "companion-mirri-soul-thief",
  key: "companion-mirri-soul-thief",
  title: "Soul Thief",
  companionId: "temper-eso-companion/mirri",
  category: "class",
  displayOrder: 11,
} as const satisfies TemperCompanionSkillLine
