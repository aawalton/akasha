import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiMariVinell = {
  id: "01a0ed1f-139c-701a-8a73-e89bd6edf31b",
  type: "page-type/lore",
  slug: "overwhere-ii-mari-vinell",
  title: "Mari Vinell",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "Mari Vinell was a Vale farm girl of real Talent, betrothed to Jeren Kalson. She is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She was the daughter of Yarl and Vana, sister of Kiv, and granddaughter of Mother Vinell.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A wild hound bit her; its tooth, left in the wound, glowed green-yellow and stank of rot.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harker treated her bite and found spiritual rot darkening her veins and tributaries.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She died sickly and swollen with infection, a memory that still pains Harker.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
