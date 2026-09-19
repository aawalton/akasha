import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shieldBash = {
  id: "01a0657d-02c0-78ed-a633-277649a7f19e",
  type: "page-type/world-skill",
  slug: "shield-bash",
  title: "Shield Bash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
