import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraOfRighteousFire = {
  id: "01a06575-97ef-7d77-bdbc-d8a475246808",
  type: "page-type/world-skill",
  slug: "aura-of-righteous-fire",
  title: "Aura of Righteous Fire",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
