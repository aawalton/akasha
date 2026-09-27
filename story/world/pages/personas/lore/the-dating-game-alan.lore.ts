import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameAlan = {
  id: "01a0de64-9824-74bb-a428-f2b61d878b92",
  type: "page-type/lore",
  slug: "the-dating-game-alan",
  title: "Alan",
  world: "world/personas",
  about: "character-player/the-dating-game-alan",
  facts: [
    {
      fact: "Alan lives alone at 1350 Apple Ave in Provo, Utah.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "Alan is single and has no children.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "Alan is recently retired and independently wealthy.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "Alan has no demands on his time or attention.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "Alan does not drink coffee.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "Alan drinks hot cocoa with breakfast.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "Alan's house has a table by a back window looking west over the valley to Utah Lake.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "Alan owns one mug, which dries in a rack in his kitchen.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "Alan's favorite clothes are black shorts over black compression tights and a loose grey shirt.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "Alan's favorite shoes are dusty light blue Ecco slip-ons.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "Alan told the woman from the boulder his name.",
      knowers: ["lore-disclosure/game-master", "character-other/the-dating-game-echo"],
    },
    {
      fact: "Alan has total aphantasia and no experiential memory, so he feels ageless.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/the-dating-game-alan",
        "character-other/the-dating-game-echo",
      ],
    },
    {
      fact: "Alan is autistic, and as a child he was always much too old for his age.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "As a kid Alan was a really weird kid, always much too old for his age.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/the-dating-game-echo",
        "character-player/the-dating-game-alan",
      ],
    },
  ],
} as const satisfies Lore
