import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveSelection = {
  id: "01a0e9f0-3dfb-79e7-b8ed-d5148bb11146",
  type: "page-type/world-mechanic",
  slug: "super-supportive-selection",
  title: "Selection",
  world: "world/super-supportive",
  aliases: ["being chosen", "being called", "selected by the contract"],
  description:
    "The System choosing a person to become Avowed, felt as a brief full-body spasm and a spoken message.",
  createdAt: "2026-09-28T21:33:50.971Z",
  updatedAt: "2026-09-28T21:33:54.000Z",
} as const satisfies WorldMechanic
