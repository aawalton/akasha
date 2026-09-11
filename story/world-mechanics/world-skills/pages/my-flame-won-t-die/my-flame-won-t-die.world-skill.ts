import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const myFlameWonTDie = {
  id: "01a0657d-0270-7b3c-805a-fc01d817737d",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "my-flame-won-t-die",
  title: "My Flame Won’t Die",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
