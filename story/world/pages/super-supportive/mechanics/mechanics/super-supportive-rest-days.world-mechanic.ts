import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveRestDays = {
  id: "01a0e9f1-cfc2-7b77-8914-39bbcc93f40a",
  type: "page-type/world-mechanic",
  slug: "super-supportive-rest-days",
  title: "Rest days",
  world: "world/super-supportive",
  aliases: ["downtime", "vacation days"],
  description: "Time off from summons, earned by days spent summoned and able to be banked.",
} as const satisfies WorldMechanic
