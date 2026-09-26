import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerEmberSiphon = {
  id: "01a0de1f-035c-797f-a9f0-c5c9a85c4059",
  type: "page-type/lore",
  slug: "the-tower-ember-siphon",
  title: "Ember Siphon",
  world: "world/personas",
  about: "world-skill/the-tower-ember-siphon",
  facts: [
    {
      fact: "Ember Siphon pulls heat essence from an object or creature, through a point of contact, into Alan.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "What the siphon takes in feeds Alan's attunement to Ember.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "The siphon reaches past a physical shell to the essence within.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "Pulling from a dense, active source near the limit of his fire can overflow and burn him.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "A cleanly opened wound lets the siphon pull deeper.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
  ],
} as const satisfies Lore
