import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportivePerception = {
  id: "01a0e9f1-065f-7eae-a6f1-ddb607d59568",
  type: "page-type/world-mechanic",
  slug: "super-supportive-perception",
  title: "Skill perception",
  world: "world/super-supportive",
  aliases: ["perception"],
  description:
    "The rule that how a person perceives their skill shapes what it can do almost as much as the skill itself.",
} as const satisfies WorldMechanic
