import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerSmithing = {
  id: "01a0de1f-035c-714d-8f6a-195d8039c966",
  type: "page-type/lore",
  slug: "the-tower-smithing",
  title: "Smithing",
  world: "world/personas",
  about: "world-skill/the-tower-smithing",
  facts: [
    {
      fact: "Smithing shapes, joins and forge-welds metal with heat, hammer and quench.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "Alan's Ember gives him reliable forge heat.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "Crude tools limit the quality of what he makes until he has better gear and an anvil.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
  ],
} as const satisfies Lore
