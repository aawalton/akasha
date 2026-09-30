import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvHobbFarm = {
  id: "01a0f35f-9aa4-74cf-b89d-839a4d3dd4a7",
  type: "page-type/place",
  slug: "overwhere-iv-hobb-farm",
  title: "Hobb Farm",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Hobb Farm lies a mile west of Millbrook, across the footbridge, hard against the Tangle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is a stone farmhouse, a barn, an orchard and three sheep fields walled in dry stone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Farmer Jory Hobb is a widower of sixty, stooped and sour, with a sheepdog called Bran.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hobb's grandson Pim, fourteen, does most of the work and is sweet on any adventurer.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some forty blue slimes crowd the orchard and the ditches, eating the windfall apples.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The slimes here are LV 1 to 3, fatter than the common's for the apples.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Two of Hobb's sheep went missing this week from the field nearest the trees.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Goblin tracks and a torn fleece lie in the mud at the far wall, by a gap onto the Tangle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hobb blames wolves for the sheep, and has not looked at the far wall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hobb's hot dinner is mutton stew and apple cake, served at his kitchen table at dusk.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
