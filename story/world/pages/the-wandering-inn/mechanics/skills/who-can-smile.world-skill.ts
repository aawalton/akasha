import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const whoCanSmile = {
  id: "01a0657d-032e-7f4d-bfeb-5ac97dd7d39c",
  type: "page-type/world-skill",
  slug: "who-can-smile",
  title: "Who Can Smile",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
