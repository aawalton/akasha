import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveAuthority = {
  id: "01a0e9f1-065e-7ae4-b7ac-e6b6284fcb53",
  type: "page-type/world-mechanic",
  slug: "super-supportive-authority",
  title: "Authority",
  world: "world/super-supportive",
  aliases: ["dominion", "influence", "presence"],
  description:
    "The ability to impress one's desires on everything; the fundamental essence of magical power.",
} as const satisfies WorldMechanic
