import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVOgarius = {
  id: "01a0e9f7-96f1-7c74-a61d-29e93130e5a8",
  type: "page-type/lore",
  slug: "otherwhere-v-ogarius",
  title: "Ogarius",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-ogarius",
  facts: [
    {
      fact: "Ogarius is a gaunt, tall Questor whose face is hidden by a hood and a skill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He belongs to Badud's grid, the founders of Giantsrest, and runs cells of assassins.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is a master of mental magic, above all fear, and wields illusion and dream magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He carries two swords he rarely uses and a plain staff that was once a god's walking stick.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He teleports with no sign of spellwork and fights from zones of darkness.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season he holds the land of Estefar and contends there with the Questor Garna.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
