import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiWrenMarsh = {
  id: "01a0ed1e-9ad5-7681-b2f2-762896909cf5",
  type: "page-type/lore",
  slug: "overwhere-ii-wren-marsh",
  title: "Wren Marsh",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "Wren Marsh is Garth's daughter, nine, thin and freckled, and never stops asking questions.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wren loves stories of the Spires and the Ancestors, and wants to see the sea.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The greymaw bite on Wren's calf is black, and dark veins creep from it toward her knee.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wren burns with fever each night and is abed at Marsh Croft, pretending to be brave.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Goody Brannoc's poultices slow Wren's rot but cannot stop it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Untreated, the rot reaches Wren's reservoir in about ten days and kills her.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A thin, freckled girl of about nine lies flushed with fever in the box bed by the fire.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
