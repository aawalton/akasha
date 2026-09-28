import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveEntrustment = {
  id: "01a0e9f1-065e-7dcf-b09f-0c65ed618b92",
  type: "page-type/world-mechanic",
  slug: "super-supportive-entrustment",
  title: "Entrustment",
  world: "world/super-supportive",
  aliases: ["entrusted"],
  description:
    "Something handed into a skill holder's care by its target on request, with no change of ownership.",
} as const satisfies WorldMechanic
