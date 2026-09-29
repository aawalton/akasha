import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiBirdTongue = {
  id: "01a0ea79-96af-73fb-b42a-0df1e6bd2418",
  type: "page-type/lore",
  slug: "otherwhere-xi-bird-tongue",
  title: "Bird Tongue",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-bird-tongue",
  facts: [
    {
      fact: "Bird Tongue is a pale, tattooed southern woman, once a thrall of the southern slavers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrak's raids on the southern slavers freed Bird Tongue.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bird Tongue learned under the spear maiden Koro before turning to administration.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bird Tongue succeeded Lady Azar as Harrak's chief administrator.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bird Tongue is the protegee of Grand Vizier Bes, and headed Harrak's administration under him.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Bird Tongue works in Harrak's government under Bes after the final war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
