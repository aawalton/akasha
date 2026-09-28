import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveGorgonsBindings = {
  id: "01a0e9f1-cfc2-79d6-87b1-0192a7832d94",
  type: "page-type/world-mechanic",
  slug: "super-supportive-gorgons-bindings",
  title: "Gorgon's bindings",
  world: "world/super-supportive",
  aliases: ["manacles", "glowing chains"],
  description:
    "Glowing golden magical ropes that chain a prisoner to a desk, which living things can't pass through.",
} as const satisfies WorldMechanic
