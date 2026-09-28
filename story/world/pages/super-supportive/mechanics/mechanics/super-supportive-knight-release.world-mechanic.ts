import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveKnightRelease = {
  id: "01a0e9f2-9a51-7b0c-ae57-aa9ae582c3a6",
  type: "page-type/world-mechanic",
  slug: "super-supportive-knight-release",
  title: "Knight release",
  world: "world/super-supportive",
  aliases: ["final sacrifice", "their rest"],
  description: "A ceremony in which knights choose death and are released by hand.",
} as const satisfies WorldMechanic
