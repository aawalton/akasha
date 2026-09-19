import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const wildGallop = {
  id: "01a0657d-032e-7c92-91fe-b671f673695e",
  type: "page-type/world-skill",
  slug: "wild-gallop",
  title: "Wild Gallop",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
