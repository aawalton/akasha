import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiImra = {
  id: "01a0ea77-aa5f-76be-acbf-bf3699e074d2",
  type: "page-type/place",
  slug: "otherwhere-xi-imra",
  title: "Imra",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-asmirel",
  exits: [
    {
      to: "place/otherwhere-xi-tavelford",
      way: "North up the valley road beside the Tavel, two days' walk into the hills.",
    },
  ],
  facts: [
    {
      fact: "Imra is a walled market town of some four thousand where the Tavel leaves the hills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Imra is two days' walk south of Tavelford, and six more by road to Qasirel on the coast.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The prince's steward for the hills, Lord Casimir Oresh, holds Imra's keep.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Imra's great market is every eighth day, for wool, cheese, beasts, salt and cloth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Imra has a temple of Sardanal with a granary, and a shrine of Enttiku by the burial ground.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An alchemist in Imra buys desert glass globules and salt flower for a few silver each.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A scribe's stall by Imra's gate writes letters and reads contracts for three copper bits a page.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Imra's gate guards ask strangers their name and business and charge two copper bits entry.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A bed at Imra's Salt Road inn costs a silver talent; a hot meal six copper bits.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The steward has posted a bounty of two silver talents a head for the hill runaways.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Sheem hawk, a spy for the conquerors, keeps a room above Imra's cloth hall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Imra is two days down the river from Tavelford.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-xi-nala",
        "character-other/otherwhere-xi-tobin-ashlar",
      ],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
