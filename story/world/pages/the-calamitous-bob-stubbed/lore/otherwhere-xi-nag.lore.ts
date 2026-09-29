import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiNag = {
  id: "01a0ea82-d976-7c6f-88a0-490530999260",
  type: "page-type/lore",
  slug: "otherwhere-xi-nag",
  title: "Nag",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-nag",
  facts: [
    {
      fact: "Nag is a marksman of the Bitter Hearts in Harrak's service.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nag's skills include Poacher's Gait, Patient Shot and Witchpact Parting.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nag held the Bitter Hearts' stand in the Remnants war with Lorn, Feather, Salt, Auntie and Mug.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Nag is with the Bitter Hearts after the last war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
