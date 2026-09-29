import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXManaUse = {
  id: "01a0eadc-11dd-75d8-ada1-bdf3e2b40ef0",
  type: "page-type/lore",
  slug: "otherwhere-x-mana-use",
  title: "Mana Use",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-mechanic/otherwhere-x-mana-use",
  facts: [
    {
      fact: "A Tier 0 has no mana to spend, whatever she tries.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Most mana is 20 at Tier 1, 60 at Tier 2, 180 at Tier 3 and 540 at Tier 4.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Each tenth of essence put into the mana path adds three tenths of that base.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A skill costs the mana its own page states; a raw working what the world builder sets.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Spending past empty is overdrawing, paid in strain on the mana muscle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Overdrawing to a quarter of most mana aches, and to a half brings a migraine.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Overdrawing to all of it brings a nosebleed, and past that she goes down.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A migraine harms one per tier, a nosebleed three per tier, a collapse six per tier.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Strain costs one to four on every act until she rests.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An hour of cycling restores a fifth of most mana, and a night's sleep all of it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Strain rested off leaves the mana muscle stronger, an hour of practice for mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No mana shows as a number in the prose.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
