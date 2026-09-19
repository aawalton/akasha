import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const innFecundFishery = {
  id: "01a06575-981e-7772-8511-d0db78418bd7",
  type: "page-type/world-skill",
  slug: "inn-fecund-fishery",
  title: "Inn: Fecund Fishery",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
