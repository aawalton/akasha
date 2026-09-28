import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveStrengthBrute = {
  id: "01a0e9f1-6aac-7661-998a-ea1c2cb88a73",
  type: "page-type/world-class",
  slug: "super-supportive-strength-brute",
  title: "Strength Brute",
  world: "world/super-supportive",
  aliases: ["strength-type Brute", "Strength type"],
  description: "A Brute subclass focused on raw physical strength.",
} as const satisfies WorldClass
