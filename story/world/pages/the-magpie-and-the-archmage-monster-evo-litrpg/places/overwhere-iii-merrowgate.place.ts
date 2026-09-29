import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiMerrowgate = {
  id: "01a0ed23-174e-77b1-afa4-bd79eee99f29",
  type: "page-type/place",
  slug: "overwhere-iii-merrowgate",
  title: "Merrowgate",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-wrenwood-crossroads",
      way: "Out the south gate and two miles down the packed-earth road between winter fields.",
      direction: "south",
    },
    {
      way: "Out the north gate onto the hill road to the upland sheep farms and the far passes.",
      direction: "north",
    },
  ],
  facts: [
    {
      fact: "Merrowgate is a walled market town of some two thousand people in the Velithra Dominion.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It lies in the Wrenmark, a hill district in the far north, weeks from any great city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its walls are gray fieldstone, raised forty years ago against beasts out of the Wrenwood.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The north gate shuts at the dusk bell; the south gate keeps a night wicket and a guard.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A traveler without papers is written in the gate book with a description and a reason.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The town bell rings at dawn, noon and dusk from the tower over the Wool Square.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Wool Square market fills each fifthday with wool, cider, salt, hill cheese and tools.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Merrowgate folk are Commons: farmers, weavers, carters, cider-pressers and a few smiths.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No Elite lives in Merrowgate; an Iron Law inspector rides in each quarter for the taxes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A reeve chosen by the town's trade guilds runs Merrowgate; the reeve now is Oswin Carrow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Adventurers Guild keeps a small post in the old tollhouse inside the south gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Guild post has a quest board, one desk, and three rooms upstairs for ringed adventurers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Only four ringed adventurers work out of Merrowgate, all Copper, and two are past fifty.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Guild board offers a blight bounty: one silver for each blightstone brought in.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Crook and Candle is the town's one inn, on the Wool Square: a bed is 8 copper, supper 3.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Hearth chapel is at the square's north end; few in town pray to any Divine now.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Brannagh Tull's herb shop, under a crooked green sign, sells salves and weak potions.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Carrow's reeve-house is the only brick house in town, beside the chapel.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Talk in Merrowgate this winter is of the blight in the Wrenwood and the boy lost in it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
