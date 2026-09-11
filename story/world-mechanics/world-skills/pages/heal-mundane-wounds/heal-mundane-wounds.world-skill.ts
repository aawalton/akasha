import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const healMundaneWounds = {
  id: "01a06575-9819-7057-b306-3e1833a54542",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "heal-mundane-wounds",
  title: "Heal Mundane Wounds",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
