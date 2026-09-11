import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const everythingHasAPrice = {
  id: "01a06575-9809-7c7f-9d23-30bc4f8e6f82",
  type: "world-skill",
  slug: "everything-has-a-price",
  title: "Everything Has a Price",
  world: "the-wandering-inn",
  aliases: ["Everything Has A Price"],
  references: "jsonl",
} as const satisfies WorldSkill
