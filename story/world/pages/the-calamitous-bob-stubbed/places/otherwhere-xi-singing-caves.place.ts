import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiSingingCaves = {
  id: "01a0ea77-aa5f-7927-9a26-93d6fb51d989",
  type: "page-type/place",
  slug: "otherwhere-xi-singing-caves",
  title: "The Singing Caves",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-wether-hills",
  exits: [
    {
      to: "place/otherwhere-xi-tavelford",
      way: "East by the shepherds' track over the ridge, half a day to the village.",
    },
  ],
  facts: [
    {
      fact: "The Singing Caves are wind-cut caves in a pale limestone gorge half a day west of Tavelford.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "When the wind blows up the gorge the caves hum and whistle, which gives them their name.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Old pictograms in Primal Viziman cover the deepest cave's walls: suns, doors, people walking.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The witch Qira, called the Salt Widow, lives in the Singing Caves with goats and a garden.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Qira is an instinctive caster of an old wind tradition; she works gray and colourless mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Qira is sixty, brown as a nut, blunt, lonely, and scornful of priests and academy mages alike.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Qira sells charms against scalehounds and fever, and wind-knots for the shepherds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Qira's husband was a salt trader who died in the desert; hence the Salt Widow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mana sits thicker in the caves than elsewhere in the hills; a caster feels it at the mouth.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
