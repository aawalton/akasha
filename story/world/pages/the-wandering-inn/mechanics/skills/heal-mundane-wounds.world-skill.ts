import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const healMundaneWounds = {
  id: "01a06575-9819-7057-b306-3e1833a54542",
  type: "page-type/world-skill",
  slug: "heal-mundane-wounds",
  title: "Heal Mundane Wounds",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.601Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
