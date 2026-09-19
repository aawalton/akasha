import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectSlice = {
  id: "01a0657d-028f-7bff-82e3-afc24358904e",
  type: "page-type/world-skill",
  slug: "perfect-slice",
  title: "Perfect Slice",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
