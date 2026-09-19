import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const magicOfAThousandSouls = {
  id: "01a0657d-0241-7b09-b498-c87d8b78c6eb",
  type: "page-type/world-skill",
  slug: "magic-of-a-thousand-souls",
  title: "Magic of a Thousand Souls",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
