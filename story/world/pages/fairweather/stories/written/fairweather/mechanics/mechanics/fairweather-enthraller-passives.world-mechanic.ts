import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const fairweatherEnthrallerPassives = {
  id: "01a106e8-584a-7186-9b1f-07ae27235232",
  type: "page-type/world-mechanic",
  slug: "fairweather-enthraller-passives",
  title: "Enthraller passives",
  world: "world/fairweather",
  description:
    "An Enthraller's passive skills come with her levels and work without being used: Devotion at level 3, Tribute at level 5, Fealty at level 7 and Covenant at level 10, each working out its sum on its own world-skill page. A passive Elsie gains is made as her character-skill on the level-up beat, and a window lists it among her skills. Before level 3 she holds no passive and her attributes are her base alone, so an Enthraller at level 1 or 2 is weaker than any girl she walks beside; once the passives come, every bond she holds feeds her and the girl alike, and the more bonds and the deeper, the stronger both. The terms they share: a bond's share is a percentage, as each passive's page states. A bond's attribute is whichever attribute holds the single highest base among Elsie's five and that girl's five; where two stand equal, the earlier of Strength, Toughness, Grace, Wits, Heart. Every amount is worked out bond by bond and attribute by attribute, each rounded down on its own, then summed. Devotion, Tribute and Fealty read bases only, never what a passive added, so no sum feeds on itself; Covenant alone reads Elsie's totals, and nothing reads what Covenant adds. Whenever a bond, a level, a passive held, or a Tether or Claim moves, the mechanics recorder works every passive amount out again on that beat and moves each attribute whose total changed. A threshold such as Devotion's 100% caps that skill's share alone, and a bond itself has no ceiling.",
} as const satisfies WorldMechanic
