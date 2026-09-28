import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveCatsAreBetterInNines = {
  id: "01a0e9f1-d241-72cc-a065-6223d60903ea",
  type: "page-type/world-skill",
  slug: "super-supportive-cats-are-better-in-nines",
  title: "Cats are better in nines.",
  world: "world/super-supportive",
  description: "A passive skill with an eccentric full-sentence name.",
} as const satisfies WorldSkill
