import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerEmberSiphon = {
  id: "01a0de1f-035c-797f-a9f0-c5c9a85c4059",
  type: "page-type/lore",
  slug: "the-tower-ember-siphon",
  title: "Ember Siphon",
  world: "world/personas",
  about: "world-skill/the-tower-ember-siphon",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "Ember Siphon pulls heat essence from an object or creature, through a point of contact, into Alan.",
    "What the siphon takes in feeds Alan's attunement to Ember.",
    "The siphon reaches past a physical shell to the essence within.",
    "Pulling from a dense, active source near the limit of his fire can overflow and burn him.",
    "A cleanly opened wound lets the siphon pull deeper.",
  ],
} as const satisfies Lore
