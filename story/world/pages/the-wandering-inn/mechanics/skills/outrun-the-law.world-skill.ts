import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const outrunTheLaw = {
  id: "01a0657d-027f-73d8-af67-91d3e7660463",
  type: "page-type/world-skill",
  slug: "outrun-the-law",
  title: "Outrun the Law",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
