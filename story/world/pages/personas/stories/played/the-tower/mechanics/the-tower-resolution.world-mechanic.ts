import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const theTowerResolution = {
  id: "01a0de08-6e74-7754-b11a-295dfd60a11f",
  type: "page-type/world-mechanic",
  slug: "the-tower-resolution",
  title: "Resolution",
  description:
    "Every roll in the Tower is real, recorded on the turn it settles and never shown, and every roll is settled with `akasha story settle`. A strike is settled by the tower-attack-resolution check. An act outside combat is rolled only where it is lethal or contested, by the tower-attribute-check check, before it is told, and its first result holds unless the fiction changes; a routine act whose outcome is not in doubt is not rolled. Absorbing an essence seed is settled by the tower-essence-absorption check. The attribute and the difficulty a roll reads are the ones the scene showed before the roll; the die is only the luck. A result reads by its band: a fumble or a miss fails, a graze succeeds at a cost, a hit succeeds, and a critical succeeds cleanly. The numbers fix how much a result is, and what it concretely is and what it costs follow from the scene. What covers a creature and what it strikes with are items the creature holds, carrying the same attack, defence and damage numbers a climber's gear carries, and a strike's base damage is the damage of the item it strikes with.",
} as const satisfies WorldMechanic
