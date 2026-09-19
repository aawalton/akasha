import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stunningShieldBash = {
  id: "01a0657d-02fe-7345-ac07-afd8041a95f5",
  type: "page-type/world-skill",
  slug: "stunning-shield-bash",
  title: "Stunning Shield Bash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
