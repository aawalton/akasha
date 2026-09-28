import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveCourtesyTrap = {
  id: "01a0e9fc-0702-7c98-a57b-c57f30eea058",
  type: "page-type/world-mechanic",
  slug: "super-supportive-courtesy-trap",
  title: "Ritual courtesy trap",
  world: "world/super-supportive",
  aliases: ["lord's table"],
  description:
    "An old rite by which a guest who eats, drinks and warms at a lord's fire is bound to speak no lies there.",
} as const satisfies WorldMechanic
