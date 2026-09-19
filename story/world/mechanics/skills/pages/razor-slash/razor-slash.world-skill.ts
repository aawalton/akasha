import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const razorSlash = {
  id: "01a0657d-02a4-73cf-9368-a0bb8e02dc04",
  type: "page-type/world-skill",
  slug: "razor-slash",
  title: "Razor Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
