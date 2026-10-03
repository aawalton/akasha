import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXTheSheaf = {
  id: "01a0eabe-0275-7b20-a4b9-a09b54f2290a",
  type: "page-type/place",
  slug: "otherwhere-x-the-sheaf",
  title: "The Sheaf",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  within: "place/otherwhere-x-harrow",
  facts: [
    {
      fact: "The Sheaf serves stew, dark bread and small beer, and has a straw-pallet loft above.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A bowl of stew and bread costs a copper; a night in the loft two copper.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "On day one's evening the Sheaf's hearth has a pot of mutton stew on it.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-x-nala"],
    },
    {
      fact: "The Sheaf supper wants a singer; the fiddler who played it last year died in the spring.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A long thatched building in Harrow has a sheaf of grain painted on its sign and smells of stew.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-x-nala"],
    },
    {
      fact: "The Sheaf has wanted a singer since the fiddler died.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-x-nala",
        "world-character/otherwhere-x-martha-deane",
      ],
    },
    {
      fact: "The Sheaf is one long smoky room of trestles and benches, a hearth at the far end.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-x-nala"],
    },
    {
      fact: "The loft is reached by a ladder behind the hearth, and is warm from the chimney.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrow's songs are old ones: harvest songs, a May song, and soldiers' ballads.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nobody in the vale has heard a song from beyond it, so a new one is a night to remember.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Sheaf's folk pay a singer in coppers left on the trestle, one or two apiece.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-x-nala",
        "world-character/otherwhere-x-martha-deane",
      ],
    },
    {
      fact: "The Sheaf's regulars are Ned Fuller the smith, Hattie Rook, and the Cranes' two hands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrow folk understand every word Nala sings; it is the song itself that is new to them.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-x-nala",
        "world-character/otherwhere-x-martha-deane",
        "character-other/otherwhere-x-aldous-crane",
      ],
    },
    {
      fact: "Of an evening a dozen or so Harrow men and women drink in the Sheaf after the dusk bell.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-x-nala"],
    },
    {
      fact: "On day one's evening Nala sang O Danny Boy and Homeward Bound in the Sheaf.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-x-nala",
        "world-character/otherwhere-x-martha-deane",
        "character-other/otherwhere-x-aldous-crane",
      ],
    },
    {
      fact: "The Sheaf's room was pleased with Nala's singing and uneasy about her at once.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-x-nala",
        "world-character/otherwhere-x-martha-deane",
        "character-other/otherwhere-x-aldous-crane",
      ],
    },
  ],
  exits: [{ to: "place/otherwhere-x-harrow", way: "out the front door onto the green" }],
} as const satisfies Place
