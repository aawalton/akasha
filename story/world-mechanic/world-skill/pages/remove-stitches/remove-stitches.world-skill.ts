import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const removeStitches = {
  id: "01a0657d-02b0-7824-9d63-db75bb823ac5",
  type: "world-skill",
  slug: "remove-stitches",
  title: "Remove Stitches",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
