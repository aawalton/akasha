import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiAmyLaurens = {
  id: "01a0de0a-0345-7f9b-bbb2-74233556883a",
  type: "page-type/lore",
  slug: "partners-ii-amy-laurens",
  title: "Amy Laurens",
  world: "world/personas",
  about: "character-other/partners-ii-amy",
  facts: [
    {
      fact: "Amy Laurens has kept Hearthholt's affairs a good many years.",
      knowers: ["lore-disclosure/game-master", "character-player/partners-ii-alan"],
    },
    {
      fact: "Amy came up to Hearthholt from Amberford.",
      knowers: ["lore-disclosure/game-master", "character-player/partners-ii-alan"],
    },
    {
      fact: "Amy climbed to Hearthholt the evening Alan arrived, with a lantern and a supper basket.",
      knowers: ["lore-disclosure/game-master", "character-player/partners-ii-alan"],
    },
    {
      fact: "Amy says she packed the basket before she had any notion whom she would meet.",
      knowers: ["lore-disclosure/game-master", "character-player/partners-ii-alan"],
    },
    {
      fact: "Amy introduced herself at Hearthholt's gate and asked whom she was feeding.",
      knowers: ["lore-disclosure/game-master", "character-player/partners-ii-alan"],
    },
    {
      fact: "Alan had not yet spoken to Amy when she asked at the gate.",
      knowers: ["lore-disclosure/game-master", "character-player/partners-ii-alan"],
    },
    { fact: "Amy's Talent is Kept.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Hearthholt's keys left Amy's locked drawer at dusk, the moment Alan arrived in Aravel.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Amy packed supper before she knew whom she would meet, which was Kept's first firing.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Amy does not know what that firing means.", knowers: ["lore-disclosure/game-master"] },
  ],
} as const satisfies Lore
