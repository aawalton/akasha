import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveAudialBrute = {
  id: "01a0e9f1-6aaa-7e1c-bf56-3eb8c368986a",
  type: "page-type/world-class",
  slug: "super-supportive-audial-brute",
  title: "Audial Brute",
  world: "world/super-supportive",
  aliases: ["audial"],
  description: "A Brute subclass with enhanced hearing.",
} as const satisfies WorldClass
