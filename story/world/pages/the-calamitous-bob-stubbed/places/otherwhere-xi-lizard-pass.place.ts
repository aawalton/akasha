import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiLizardPass = {
  id: "01a0ea88-4595-7906-8af9-da47fa0c9e5c",
  type: "page-type/place",
  slug: "otherwhere-xi-lizard-pass",
  title: "Lizard Pass",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-baran-eastern-marches",
  facts: [
    {
      fact: "Lizard Pass is the great ravine pass through the mountains between Baran and Halluria.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lizard Pass is fortified with four walls.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Beyond Lizard Pass lie Halluria's desert plains.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Battle of the Pass, ten years ago, was fought over three days at Lizard Pass.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At Lizard Pass the Alliance first crushed a Hallurian host, then faced the Nemeti.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "About fifty thousand Nemeti came against Lizard Pass; their god-avatar was destroyed there.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Freed thralls and isthmus refugees followed Harrak home from Lizard Pass by portal.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
