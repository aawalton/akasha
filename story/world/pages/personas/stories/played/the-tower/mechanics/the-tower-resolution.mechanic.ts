import type { Mechanic } from "akasha/story/mechanic/mechanic.page-type.types.ts"

export const theTowerResolution = {
  id: "01a0de08-6e74-7754-b11a-295dfd60a11f",
  type: "page-type/mechanic",
  slug: "the-tower-resolution",
  title: "Resolution",
  description:
    "Every roll in the Tower is real, recorded and never shown. A strike is settled by the attack-resolution mechanic. An act outside combat is rolled only where it is lethal or contested, by the attribute-check mechanic, before it is told, and its first result holds unless the fiction changes; a routine act whose outcome is not in doubt is not rolled. A result reads by its band: a fumble or a miss fails, a graze succeeds at a cost, a hit succeeds, and a critical succeeds cleanly. What covers a creature and what it strikes with are items the creature holds, carrying the same attack, defence and damage numbers a climber's gear carries, and a strike's base damage is the damage of the item it strikes with.",
} as const satisfies Mechanic
