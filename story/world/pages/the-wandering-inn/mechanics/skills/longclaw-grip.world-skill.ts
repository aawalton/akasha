import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const longclawGrip = {
  id: "01a0657d-0240-7a39-a049-5538720da00f",
  type: "page-type/world-skill",
  slug: "longclaw-grip",
  title: "Longclaw Grip",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
