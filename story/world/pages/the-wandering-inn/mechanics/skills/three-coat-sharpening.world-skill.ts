import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const threeCoatSharpening = {
  id: "01a0657d-0315-7d38-9475-1b15aac0cc56",
  type: "page-type/world-skill",
  slug: "three-coat-sharpening",
  title: "Three-Coat Sharpening",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
