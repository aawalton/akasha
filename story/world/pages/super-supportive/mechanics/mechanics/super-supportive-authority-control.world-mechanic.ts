import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveAuthorityControl = {
  id: "01a0e9f1-065d-7cea-bafc-24d1c7e9835d",
  type: "page-type/world-mechanic",
  slug: "super-supportive-authority-control",
  title: "Authority control",
  world: "world/super-supportive",
  aliases: ["patting", "existential fist bump", "wizard pat"],
  description: "Moving one's own authority on purpose.",
} as const satisfies WorldMechanic
