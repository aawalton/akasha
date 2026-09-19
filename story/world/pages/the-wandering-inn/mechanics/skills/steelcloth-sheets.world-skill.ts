import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const steelclothSheets = {
  id: "01a0657d-02fa-78aa-9e41-1e3d43483d3d",
  type: "page-type/world-skill",
  slug: "steelcloth-sheets",
  title: "Steelcloth Sheets",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
