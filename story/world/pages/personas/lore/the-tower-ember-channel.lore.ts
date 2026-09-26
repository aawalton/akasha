import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerEmberChannel = {
  id: "01a0de1f-035c-7a98-a8ec-449cb184c968",
  type: "page-type/lore",
  slug: "the-tower-ember-channel",
  title: "Ember Channel",
  world: "world/personas",
  about: "world-skill/the-tower-ember-channel",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "Ember Channel projects Ember essence into held iron, at the tip or along a longer span.",
    "Iron lit this way lends a searing ember heat to its strikes.",
    "The channel runs on Alan's own ember, lasts only while he feeds it, and carries only Ember.",
    "Invoking and holding the channel costs focus, and the more metal lit, the greater the drain.",
    "Cold water quenches the channel fast.",
    "The channel grows stronger with use and with Alan's attunement to Ember.",
  ],
} as const satisfies Lore
