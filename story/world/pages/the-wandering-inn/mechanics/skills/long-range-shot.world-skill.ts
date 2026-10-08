import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const longRangeShot = {
  id: "01a0657d-0240-73e1-b7b4-c7ca4742b06f",
  type: "page-type/world-skill",
  slug: "long-range-shot",
  title: "Long Range Shot",
  world: "world/the-wandering-inn",
  appearanceCount: 7,
  aliases: ["Long-Range Shot"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.528Z",
  updatedAt: "2026-09-22T13:32:44.000Z",
} as const satisfies WorldSkill
