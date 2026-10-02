import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvBrooksideFour2 = {
  id: "01a0fe71-e4db-7bf7-9377-c4de448e6175",
  type: "page-type/lore",
  slug: "overwhere-iv-brookside-four-2",
  title: "The Brookside Four, continued",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Dace asked Nala to join the Brookside Four for good, after hearing of the hobgoblin and wolf.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "lore/overwhere-iv-brookside-four",
      ],
    },
    {
      fact: "In the Four, every job's pay splits evenly among those who went, as the ears were split.",
      knowers: ["lore-disclosure/game-master", "lore/overwhere-iv-brookside-four"],
    },
    {
      fact: "Dace leads the Four in the field; a member who joins follows his call in a fight.",
      knowers: ["lore-disclosure/game-master", "lore/overwhere-iv-brookside-four"],
    },
    {
      fact: "A member of the Four may take a job alone when the Four have none, and keeps that pay.",
      knowers: ["lore-disclosure/game-master", "lore/overwhere-iv-brookside-four"],
    },
    {
      fact: "Wren urged Dace to ask Nala; Orla is glad of it; Merrit is against it and says so.",
      knowers: ["lore-disclosure/game-master", "lore/overwhere-iv-brookside-four"],
    },
    {
      fact: "With a fifth member the Four would ask Ilsa for the farm night watch, one of them each farm.",
      knowers: ["lore-disclosure/game-master", "lore/overwhere-iv-brookside-four"],
    },
  ],
} as const satisfies Lore
