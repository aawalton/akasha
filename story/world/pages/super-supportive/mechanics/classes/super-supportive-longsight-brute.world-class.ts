import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveLongsightBrute = {
  id: "01a0e9f1-6aab-7b8a-971d-c76d31d91ed0",
  type: "page-type/world-class",
  slug: "super-supportive-longsight-brute",
  title: "Longsight",
  world: "world/super-supportive",
  aliases: ["Longsight Brute", "longsight"],
  description: "A Brute subclass that sees far away.",
} as const satisfies WorldClass
