import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const removeStitches = {
  id: "01a0657d-02b0-7824-9d63-db75bb823ac5",
  type: "page-type/world-skill",
  slug: "remove-stitches",
  title: "Remove Stitches",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
