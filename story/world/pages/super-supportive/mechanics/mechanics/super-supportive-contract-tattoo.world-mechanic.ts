import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveContractTattoo = {
  id: "01a0e9f1-cfc2-7fe5-927e-55108b1d3134",
  type: "page-type/world-mechanic",
  slug: "super-supportive-contract-tattoo",
  title: "Contract tattoo",
  world: "world/super-supportive",
  description:
    "The magic-ink mark of a wizard's contract, whose shapes mean what both parties agree they mean.",
} as const satisfies WorldMechanic
