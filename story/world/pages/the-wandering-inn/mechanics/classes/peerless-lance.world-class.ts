import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const peerlessLance = {
  id: "01a0657e-0237-7585-9d8d-eeb4627f54d1",
  type: "page-type/world-class",
  slug: "peerless-lance",
  title: "Peerless Lance",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["world-class/lancer-of-the-ages"],
  createdAt: "2026-09-03T04:19:12.055Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
