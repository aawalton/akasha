import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveEmergencyTeleport = {
  id: "01a0e9f2-9a51-796d-b53d-bfc0e44d74b4",
  type: "page-type/world-mechanic",
  slug: "super-supportive-emergency-teleport",
  title: "Emergency teleport",
  world: "world/super-supportive",
  aliases: ["ET"],
  description: "A teleport an Avowed calls on the System for to take them back to safety.",
  createdAt: "2026-09-28T21:36:25.681Z",
  updatedAt: "2026-09-28T21:36:28.000Z",
} as const satisfies WorldMechanic
