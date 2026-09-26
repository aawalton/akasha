import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const haremHotelResolution = {
  id: "01a0de50-4fdc-7861-a5c2-e2090d1dddfc",
  type: "page-type/world-mechanic",
  slug: "harem-hotel-resolution",
  title: "Resolution",
  description:
    "Every roll in the Harem Hotel is real, recorded on the turn it settles and never shown, and every roll is settled with `akasha story settle`. A roll is thrown on two ten-sided dice, except that Alan and Aria each throw one twenty-sided die, the wide flat spread with high ceilings and real floors. A strike is settled by the harem-hotel-attack-resolution check: a strike at the body is handed the striker's physical attack and the defender's physical defence, and a strike at the mind the striker's mental attack and the defender's mental defence. A strike's base damage is the damage of the item it strikes with. The numbers fix how much a strike does; what it does is judged against the mechanics the Hotel has declared and the floor's own design, so a mirror construct returns spent force to its attacker rather than taking it.",
} as const satisfies WorldMechanic
