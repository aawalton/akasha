import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const oneLuckySave = {
  id: "01a0657d-027c-71e0-a09a-bb58928a2e49",
  type: "page-type/world-skill",
  slug: "one-lucky-save",
  title: "One Lucky Save",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
