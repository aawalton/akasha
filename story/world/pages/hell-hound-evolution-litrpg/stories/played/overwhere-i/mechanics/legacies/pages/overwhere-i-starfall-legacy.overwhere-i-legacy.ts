import type { OverwhereILegacy } from "akasha/story/world/pages/hell-hound-evolution-litrpg/stories/played/overwhere-i/mechanics/legacies/overwhere-i-legacy.page-type.types.ts"

export const overwhereIStarfallLegacy = {
  id: "01a0ed18-971a-7eb8-be15-ea85d2a22421",
  type: "page-type/overwhere-i-legacy",
  slug: "overwhere-i-starfall-legacy",
  title: "Starfall Legacy",
  world: "world/hell-hound-evolution-litrpg",
  description:
    "A System blessing holding all five elements in deep reserves that fill again from within.",
  ranks: ["Ember", "Flare", "Comet", "Meteor", "Starfall"],
  refillMinutes: 10,
  elementCost: 1,
} as const satisfies OverwhereILegacy
