import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIvGreenStoneForest = {
  id: "01a0ea0e-9f5a-77b0-abae-263d5fe4eaf9",
  type: "page-type/place",
  slug: "otherwhere-iv-green-stone-forest",
  title: "Green Stone Forest",
  world: "world/beware-of-chicken",
  within: "place/otherwhere-iv-azure-hills",
  facts: [
    {
      fact: "Green Stone Forest lies to the south, covered in huge stone karsts like petrified tree trunks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some Green Stone Forest karsts are wide enough to hold a whole castle on top.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Hanging Towns of Green Stone Forest are settlements strung on bridges between karsts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Green Stone Forest tribes trade a fermented pepper paste called Gochujang.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Thousand Needles is Green Stone Forest's tidal karst forest on the southwest coast.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At high tide the Thousand Needles' spires bloom with rainbow-colored coral and anemones.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
