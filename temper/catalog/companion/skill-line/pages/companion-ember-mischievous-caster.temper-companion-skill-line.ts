import type { TemperCompanionSkillLine } from "akasha/temper/catalog/companion/skill-line/temper-companion-skill-line.page-type.types.ts"

export const companionEmberMischievousCaster = {
  id: "01a05fce-c4a1-7248-babc-2a6c02f272ec",
  type: "page-type/temper-companion-skill-line",
  slug: "companion-ember-mischievous-caster",
  key: "companion-ember-mischievous-caster",
  title: "Mischievous Caster",
  companionId: "temper-eso-companion/ember",
  category: "class",
  displayOrder: 3,
} as const satisfies TemperCompanionSkillLine
