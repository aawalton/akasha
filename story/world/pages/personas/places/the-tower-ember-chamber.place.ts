import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerEmberChamber = {
  id: "01a0d43f-bad8-73fe-ade9-a9d88f7a0c31",
  type: "page-type/place",
  slug: "the-tower-ember-chamber",
  title: "The Ember Chamber",
  world: "world/personas",
  within: "place/the-tower-floor-01",
  depth: 1,
  description:
    "Low round chamber past the iron door, cold now. The Ashling's grey ash lies in a heap among a scatter of blackened bone in the center. Far wall: a stair climbing through the opened slab — the way up.",
  exits: [
    { to: "place/the-tower-cistern-walkway", way: "the stair through the opened slab" },
    { to: "place/the-tower-threshold-landing", way: "the iron door he came through" },
  ],
  facts: [
    {
      fact: "The Ember Chamber has no light of its own; the Ashling's core lit it.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "The Ember Chamber holds no water.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
  ],
} as const satisfies Place
