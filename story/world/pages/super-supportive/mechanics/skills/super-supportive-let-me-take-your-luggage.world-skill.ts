import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveLetMeTakeYourLuggage = {
  id: "01a0e9f1-d242-7e1c-9082-fdac9a656b8a",
  type: "page-type/world-skill",
  slug: "super-supportive-let-me-take-your-luggage",
  title: "Let Me Take Your Luggage",
  world: "world/super-supportive",
  aliases: ["The Bearer of All Burdens", "skill number one hundred and twelve", "One twelve"],
  description:
    "A B-rank Rabbit skill: the Rabbit carries an item that has been entrusted to them, and the item is preserved.",
} as const satisfies WorldSkill
