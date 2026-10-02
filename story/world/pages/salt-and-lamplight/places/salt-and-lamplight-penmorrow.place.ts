import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const saltAndLamplightPenmorrow = {
  id: "01a0fd0b-91b8-7dde-aa84-4a00ed775d96",
  type: "page-type/place",
  slug: "salt-and-lamplight-penmorrow",
  title: "Penmorrow",
  world: "world/salt-and-lamplight",
  facts: [
    {
      fact: "Penmorrow is a small harbour town of grey stone and slate roofs, built steep round a walled harbour.",
      knowers: ["lore-disclosure/game-master", "character-other/salt-and-lamplight-morwenna"],
    },
    {
      fact: "Some three hundred people live in Penmorrow, most of them by the boats, the nets or the salting.",
      knowers: ["lore-disclosure/game-master", "character-other/salt-and-lamplight-morwenna"],
    },
    {
      fact: "Penmorrow's harbour holds a dozen fishing boats, and the herring season is ending.",
      knowers: ["lore-disclosure/game-master", "character-other/salt-and-lamplight-morwenna"],
    },
    {
      fact: "A chapel, a chandlery, a bakery, an inn and a fish market line Penmorrow's harbour front.",
      knowers: ["lore-disclosure/game-master", "character-other/salt-and-lamplight-morwenna"],
    },
    {
      fact: "Penmorrow folk are chapel-quiet and slow to trust a stranger, and every one of them talks.",
      knowers: ["lore-disclosure/game-master", "character-other/salt-and-lamplight-morwenna"],
    },
    {
      fact: "A supply boat calls at Penmorrow once a fortnight with lamp oil, flour and post from the south.",
      knowers: ["lore-disclosure/game-master", "character-other/salt-and-lamplight-morwenna"],
    },
    {
      fact: "A cliff path runs a mile north from Penmorrow to Morrow Head.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/salt-and-lamplight-morwenna",
        "character-player/salt-and-lamplight-nala",
      ],
    },
    {
      fact: "The Anchor's rooms are full of hired salting crews until the herring season closes.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/salt-and-lamplight-dilys",
        "character-other/salt-and-lamplight-morwenna",
      ],
    },
  ],
} as const satisfies Place
