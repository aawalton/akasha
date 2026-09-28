import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveFlightLicense = {
  id: "01a0e9f9-1fa2-73e9-a102-d8eef600fec0",
  type: "page-type/world-mechanic",
  slug: "super-supportive-flight-license",
  title: "flight license",
  world: "world/super-supportive",
  aliases: ["flare your license", "Special circumstances cookie license"],
  description: "SkySea's permission to fly on Anesidora.",
} as const satisfies WorldMechanic
