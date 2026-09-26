import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerEmberChannel = {
  id: "01a0de1f-035c-7a98-a8ec-449cb184c968",
  type: "page-type/lore",
  slug: "the-tower-ember-channel",
  title: "Ember Channel",
  world: "world/personas",
  about: "world-skill/the-tower-ember-channel",
  facts: [
    {
      fact: "Ember Channel projects Ember essence into held iron, at the tip or along a longer span.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "Iron lit this way lends a searing ember heat to its strikes.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "The channel runs on Alan's own ember, lasts only while he feeds it, and carries only Ember.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "Invoking and holding the channel costs focus, and the more metal lit, the greater the drain.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "Cold water quenches the channel fast.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "The channel grows stronger with use and with Alan's attunement to Ember.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
  ],
} as const satisfies Lore
