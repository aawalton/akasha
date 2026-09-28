import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVFernHollow = {
  id: "01a0e9e4-706a-77ea-88bf-f538189767cf",
  type: "page-type/place",
  slug: "otherwhere-v-fern-hollow",
  title: "Fern Hollow",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-greyscale-wood",
  exits: [
    {
      to: "place/otherwhere-v-woodcutters-track",
      way: "Down along the brook a mile and a half to a log bridge on the track; an hour barefoot.",
      direction: "south",
    },
    {
      to: "place/otherwhere-v-greyscale-ridge",
      way: "Up the steep, root-stepped slope a quarter mile to the ridge; fifteen minutes.",
      direction: "up",
    },
    {
      to: "place/otherwhere-v-greyscale-wood",
      way: "Out through the trees in any other direction, into trackless scalebark forest.",
    },
  ],
  facts: [
    {
      fact: "Fern Hollow is a bowl-shaped clearing in an old forest, floored with moss and ferns.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-v-nala"],
    },
    {
      fact: "The hollow's trees are huge and straight, with bark like grey scales and bluish leaves.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-v-nala"],
    },
    {
      fact: "A spring rises in the hollow's low side and runs off as a clear, cold brook.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Faint green lights drift under the canopy at dusk, and the ferns glow where they touch.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-v-nala"],
    },
    {
      fact: "The brook runs down toward a woodcutters' track and, beyond it, a river valley.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A spring wells up between two roots on the hollow's low side and runs downhill as a clear brook.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-v-nala"],
    },
    {
      fact: "Faint green lights drift under the canopy over the hollow as the light goes golden toward dusk.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-v-nala"],
    },
    {
      fact: "Something unseen in the hollow's ferns ticks and clicks like a clock with too many hands.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-v-nala"],
    },
    {
      fact: "The ticking in the ferns is click-lizards, finger-long insect eaters, harmless.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Click-lizards fall silent at any loud sound or large animal, then resume within minutes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The three rising whistled notes are lantern-owls calling at dusk, answered by their mates.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The drifting green lights are lamp-moths; the fern pollen they brush off glows briefly.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The spring water is clean and cold, and safe to drink.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A gloamcat dens in the rocks on the ridge a quarter mile above the hollow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A raised voice at dusk carries to the ridge; the gloamcat comes to look within the hour.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nothing in the hollow answers words; no person lives within six miles of it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The hollow is warm by day in early autumn and falls near freezing before dawn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The ticking in the hollow's ferns falls quiet at a voice, then starts up again after a while.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-v-nala"],
    },
    {
      fact: "Three rising whistled notes sound far off around the hollow toward dusk, and are answered.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-v-nala"],
    },
  ],
} as const satisfies Place
