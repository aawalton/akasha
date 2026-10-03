import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiMotherSallow = {
  id: "01a0ed31-66ed-75c5-91d8-3309c5c2d908",
  type: "page-type/lore",
  slug: "overwhere-iii-mother-sallow",
  title: "Mother Sallow",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-mother-sallow",
  facts: [
    {
      fact: "Mother Sallow is a charcoal-burner living alone in a smoking hut by the Wren Brook.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She looks sixty, stooped and soot-grimed, with a kind soft voice and a gray shawl.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She came to the Wrenwood two winters ago; townsfolk buy her charcoal and like her.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "By day her two corrupted wolves lie in a brush lean-to behind her hut, out of sight.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
