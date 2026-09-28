import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveReversion = {
  id: "01a0e9f5-fded-7f07-93fa-457930c4d6ed",
  type: "page-type/world-mechanic",
  slug: "super-supportive-reversion",
  title: "Reversion",
  world: "world/super-supportive",
  aliases: ["healing reversion"],
  description: "A healer's work undoing itself, so a healed injury returns.",
} as const satisfies WorldMechanic
