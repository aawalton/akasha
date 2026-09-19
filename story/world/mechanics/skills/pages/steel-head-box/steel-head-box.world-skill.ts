import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const steelHeadBox = {
  id: "01a0657d-02fa-7ad5-ab0f-41b56e9b5b4b",
  type: "page-type/world-skill",
  slug: "steel-head-box",
  title: "Steel Head (Box)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
