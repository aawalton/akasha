import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiWaystoneShrine = {
  id: "01a0ea63-7455-7444-93e2-a06ae5a6d438",
  type: "page-type/place",
  slug: "otherwhere-xi-waystone-shrine",
  title: "The Waystone Shrine",
  world: "world/the-calamitous-bob-stubbed",
  facts: [
    {
      fact: "The shrine is a roofless ring of standing stones on a grassy hilltop beside a hill road.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-xi-nala"],
    },
    {
      fact: "At the ring's centre is a flat grey altar stone, carved with a door and a key.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-xi-nala"],
    },
    {
      fact: "The shrine is a travellers' shrine to Maradoc, god of travels and mysteries.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Travellers leave small offerings on the altar: a copper coin, a dried flower, a bread crust.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-xi-nala"],
    },
    {
      fact: "The hill road winds down the slope to a river valley, where a village's roofs show.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-xi-nala"],
    },
    {
      fact: "It is early morning; dew is on the grass and mist lies in the valley below.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-xi-nala"],
    },
    {
      fact: "The village in the valley is an hour's walk down the road.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The hill country here is far from Param and its wars.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The ring's standing stones are grey and lichen-spotted, each taller than a man.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-xi-nala"],
    },
  ],
} as const satisfies Place
