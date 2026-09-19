import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const armoredFur = {
  id: "01a06575-97ec-7016-b896-cfe0c93379fc",
  type: "page-type/world-skill",
  slug: "armored-fur",
  title: "Armored Fur",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
