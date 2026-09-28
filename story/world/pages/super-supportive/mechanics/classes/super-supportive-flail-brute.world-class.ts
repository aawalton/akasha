import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveFlailBrute = {
  id: "01a0e9f1-6aab-7ac5-acfb-0395851e9181",
  type: "page-type/world-class",
  slug: "super-supportive-flail-brute",
  title: "Flail Brute",
  world: "world/super-supportive",
  description: "A Brute subclass that stretches its limbs, without full shapeshifting.",
} as const satisfies WorldClass
