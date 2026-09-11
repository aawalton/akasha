import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const wailOfTheBanshee = {
  id: "01a0657d-032c-7111-9a91-4880afec05b3",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "wail-of-the-banshee",
  title: "Wail of the Banshee",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
