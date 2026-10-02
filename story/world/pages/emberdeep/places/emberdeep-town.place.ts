import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const emberdeepTown = {
  id: "01a0fdc6-e790-723b-9972-a23f195ffd66",
  type: "page-type/place",
  slug: "emberdeep-town",
  title: "Emberdeep",
  world: "world/emberdeep",
  facts: [
    {
      fact: "Emberdeep climbs a mountainside in steep stone streets around the Mouth, the Deep's arched cave.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-other/emberdeep-elowen",
        "character-player/emberdeep-nala",
      ],
    },
    {
      fact: "Coppergate is the square below the Mouth, where the guild hall faces the finds market.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-other/emberdeep-elowen",
        "character-player/emberdeep-nala",
      ],
    },
    {
      fact: "The finds market fills Coppergate every day but Restday, and delvers sell what they bring up there.",
      knowers: ["lore-disclosure/game-master", "character-other/emberdeep-wren"],
    },
    {
      fact: "The Lantern House, where the healers mend delvers, is beside the Mouth, its lamps lit night and day.",
      knowers: ["lore-disclosure/game-master", "character-other/emberdeep-wren"],
    },
    {
      fact: "The Brass Kettle on Coppergate is the delvers' tavern: cheap, loud and warm until late.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-other/emberdeep-elowen",
        "character-player/emberdeep-nala",
      ],
    },
    {
      fact: "Ladder Lane climbs from Coppergate in long flights of stone steps, lined with rooming houses.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
      ],
    },
    {
      fact: "A supper of stew, bread and small beer at the Brass Kettle costs four pennies.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-wren",
        "character-other/emberdeep-elowen",
      ],
    },
    {
      fact: "Above the town a steep path climbs to the Warm Pools, hot springs in the rock, free to anyone.",
      knowers: ["lore-disclosure/game-master", "character-other/emberdeep-wren"],
    },
    {
      fact: "On Restday women bathe at the Warm Pools in the morning and men in the afternoon, by old custom.",
      knowers: ["lore-disclosure/game-master", "character-other/emberdeep-wren"],
    },
    {
      fact: "The Warm Pools steam even in snow, and delvers say they ease every ache the Deep gives.",
      knowers: ["lore-disclosure/game-master", "character-other/emberdeep-wren"],
    },
  ],
} as const satisfies Place
