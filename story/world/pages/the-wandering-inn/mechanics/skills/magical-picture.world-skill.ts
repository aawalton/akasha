import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const magicalPicture = {
  id: "01a0657d-0242-7062-bb3b-b9396c77f276",
  type: "page-type/world-skill",
  slug: "magical-picture",
  title: "Magical Picture",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
