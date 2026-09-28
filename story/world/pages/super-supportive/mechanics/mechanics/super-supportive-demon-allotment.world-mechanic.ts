import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveDemonAllotment = {
  id: "01a0e9f1-cfc2-723a-8675-22be89850b7b",
  type: "page-type/world-mechanic",
  slug: "super-supportive-demon-allotment",
  title: "Demon allotment",
  world: "world/super-supportive",
  aliases: ["annual demon", "Demon Day", "demon-squashing event"],
  description: "The one or two demons a year that Earth must deal with.",
} as const satisfies WorldMechanic
