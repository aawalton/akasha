import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const napTap = {
  id: "01a0657d-0271-7b58-932f-72efe9555cb0",
  type: "page-type/world-skill",
  slug: "nap-tap",
  title: "Nap Tap",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
