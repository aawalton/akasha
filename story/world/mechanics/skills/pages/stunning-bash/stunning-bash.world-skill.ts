import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stunningBash = {
  id: "01a0657d-02fe-7318-a807-08905d1fac13",
  type: "page-type/world-skill",
  slug: "stunning-bash",
  title: "Stunning Bash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
