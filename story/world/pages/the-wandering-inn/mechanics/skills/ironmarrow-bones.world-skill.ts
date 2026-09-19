import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ironmarrowBones = {
  id: "01a06575-9820-7ee6-8397-178e32f448bf",
  type: "page-type/world-skill",
  slug: "ironmarrow-bones",
  title: "Ironmarrow Bones",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
