import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveCarriage = {
  id: "01a0e9f1-065e-757f-98bb-a18007774a43",
  type: "page-type/world-mechanic",
  slug: "super-supportive-carriage",
  title: "Carriage",
  world: "world/super-supportive",
  aliases: ["carriage rule", "the geas"],
  description:
    "The rule that a preserved item stays preserved only while its bearer keeps carrying it.",
} as const satisfies WorldMechanic
