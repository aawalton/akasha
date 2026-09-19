import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aquaLung = {
  id: "01a06575-97ec-7a48-ac86-b7a5e962b4a6",
  type: "page-type/world-skill",
  slug: "aqua-lung",
  title: "Aqua Lung",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
