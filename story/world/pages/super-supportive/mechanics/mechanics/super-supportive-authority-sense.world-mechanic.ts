import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveAuthoritySense = {
  id: "01a0e9f1-065e-7863-a3b7-0bf1edc682ee",
  type: "page-type/world-mechanic",
  slug: "super-supportive-authority-sense",
  title: "Authority sense",
  world: "world/super-supportive",
  aliases: ["the sixth sense"],
  description: "The sense by which a person feels their own authority.",
} as const satisfies WorldMechanic
