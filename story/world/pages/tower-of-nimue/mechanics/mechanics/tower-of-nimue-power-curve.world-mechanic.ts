import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const towerOfNimuePowerCurve = {
  id: "01a0deeb-597e-72d5-98f1-fb83ccfcc163",
  type: "page-type/world-mechanic",
  slug: "tower-of-nimue-power-curve",
  title: "Power Curve, Floors 1 to 10",
  world: "world/tower-of-nimue",
  description:
    "On floors 1 to 10 a normal enemy has 70 × 1.25^(floor − 1) HP, about 70 on floor 1, 171 on floor 5 and 521 on floor 10, and deals 14 × 1.25^(floor − 1) damage, about 14, 34 and 104. The floor 10 Gatekeeper has three times a normal enemy's HP, about 1565, deals 1.3 times its damage, about 136, and carries a mechanic that demands a specific essence answer. It is the first true wall: damage reduction caps near 15%, so it is survived through the right essence answer rather than by tanking.",
} as const satisfies WorldMechanic
