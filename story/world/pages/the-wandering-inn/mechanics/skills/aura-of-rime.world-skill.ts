import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraOfRime = {
  id: "01a06575-97ef-7aeb-9651-e40c0e1cfee7",
  type: "page-type/world-skill",
  slug: "aura-of-rime",
  title: "Aura of Rime",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
