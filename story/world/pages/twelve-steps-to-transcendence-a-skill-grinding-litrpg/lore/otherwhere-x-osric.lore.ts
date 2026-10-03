import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXOsric = {
  id: "01a0ead3-6c43-76d6-b6d0-8f6aa0629574",
  type: "page-type/lore",
  slug: "otherwhere-x-osric",
  title: "King Osric",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-character/otherwhere-x-osric",
  facts: [
    {
      fact: "Sulon's king is Osric, second of that name, of House Sable.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-x-nala",
        "character-other/otherwhere-x-aldous-crane",
      ],
    },
    {
      fact: "Osric keeps his court at Everhold, in the south of the kingdom.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sulon has been at peace through Osric's reign; his soldiers keep the roads and the fords.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Osric's peace holds because the rifts that open in his land are few and small.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "To heartland folk the king is a name on coin and tally rather than a face.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-x-nala",
        "character-other/otherwhere-x-aldous-crane",
      ],
    },
    {
      fact: "Osric has an old grievance with a neighbouring kingdom over a river ford.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A reeve like Aldous answers up through his lord and the king's steward, never to the king.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-x-nala",
        "character-other/otherwhere-x-aldous-crane",
      ],
    },
  ],
} as const satisfies Lore
