import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const fairweatherClassAttributes = {
  id: "01a106e8-584a-7d68-b178-cb184bcc4241",
  type: "page-type/world-mechanic",
  slug: "fairweather-class-attributes",
  title: "Class attributes",
  world: "world/fairweather",
  description:
    "What each class starts with at its Naming, and what it gains at each level after the first, in the order Strength, Toughness, Grace, Wits, Heart. Enthraller: 1, 2, 2, 3, 4, the feeblest start of any class on record; +1 Wits and +1 Heart a level, the slowest gains of any, for an Enthraller's strength was always meant to come from others. Berserker: 7, 6, 4, 1, 2; +2 Strength, +1 Toughness, +1 Grace a level. Alchemist: 2, 3, 4, 8, 3; +2 Wits, +1 Grace, +1 Heart a level. Warden: 3, 4, 4, 4, 5; +2 Heart, +1 Toughness, +1 Wits a level. Every other class starts with 20 points and gains 4 a level, and the world builder writes its spread here before a girl of that class first enters. Cora's level is the guild's business and no window of hers is shown, so her attributes count her a level 9 Warden, a judgement that holds until the prose says otherwise. Before chapter 1 the bases stand at: Elsie, not yet Named, 0 in each; Tamsin, a level 8 Berserker, 21, 13, 11, 1, 2; Tilly, a level 2 Alchemist, 2, 3, 5, 10, 4; Cora 3, 12, 4, 12, 21. Elsie is Named in chapter 1 at 1, 2, 2, 3, 4, and reaches level 2 in chapter 4 at 1, 2, 2, 4, 5.",
} as const satisfies WorldMechanic
