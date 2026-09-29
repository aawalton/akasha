import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvMillbrookCommon = {
  id: "01a0ed12-cfce-7250-bb26-1bf70d4a7606",
  type: "page-type/place",
  slug: "overwhere-iv-millbrook-common",
  title: "Millbrook Common",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Millbrook Common is open grazing ground along a brook, below a small walled town.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iv-nala"],
    },
    {
      fact: "A wooden footbridge crosses the brook, and a mill wheel turns beside the town gate.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iv-nala"],
    },
    {
      fact: "Sheep graze the common, and a few small blue slimes bob in the long grass by the water.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iv-nala"],
    },
    {
      fact: "A road runs past the common into the town gate, busy with carts on market days.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iv-nala"],
    },
    {
      fact: "Millbrook lies in a quiet region far from where the canon's people are.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The town has a small adventurers' hall that posts work on a board by its door.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The slimes on the common are blue slimes of LV 1 to 3, and they are harmless.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Children harvest the slimes' jelly with knives and jars, for a copper a jar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A cut slime slowly regrows its jelly, so the town takes care never to kill them all.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lately more slimes gather on the common each day than the day before.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some of the new slimes have red cores instead of the usual blue.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The townsfolk have noticed the growing slime crowd, and nobody can say why.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
