import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVRuskPell = {
  id: "01a0ea05-f769-7b39-bf12-096db63ff8a4",
  type: "page-type/lore",
  slug: "otherwhere-v-rusk-pell",
  title: "Rusk Pell",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-rusk-pell",
  facts: [
    {
      fact: "Rusk Pell is an outlaw camped at the charcoal burners' hut on the river road below Serrinford.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rusk is a wiry man of about thirty with gapped teeth, a snare-scarred hand and a sheepskin coat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rusk is a level twenty-two Poacher, deft with snares and a sling.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rusk fled Harrowmere after killing a man in a tavern brawl last spring.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rusk robs lone travellers but has never hurt one who handed over what they had.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rusk would rob a stranger with nothing, then likely share his fire and let her go.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rusk wants to get far from the vale before the rangers or Harrowmere's watch find him.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
