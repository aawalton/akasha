import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const theBeholderAttributes = {
  id: "01a0deed-6021-7690-aadf-842c910ea5de",
  type: "page-type/world-mechanic",
  slug: "the-beholder-attributes",
  title: "Attributes",
  world: "world/the-beholder",
  description:
    "The System overlays everyone with six attributes, on a scale where 10 is an average adult human. Might is physical force: striking, lifting, melee lethality. Vitality is health, durability, regeneration and resistance. Celerity is speed and reflexes: movement, evasion, attack cadence. Acuity is perception and precision: senses, aim, reading a target, and it sharpens an Acquisition appraisal. Will is the psyche: resolve, nerve, mental resistance, and it multiplies the output of stolen powers. Allure is presence and aesthetic gravity: charm, enthrall, intimidate, command attention. Allure is pure upside, making prey hesitate, approach, trust or freeze; it is the attribute that makes its holder more beautiful. Beauty itself is no meter.",
} as const satisfies WorldMechanic
