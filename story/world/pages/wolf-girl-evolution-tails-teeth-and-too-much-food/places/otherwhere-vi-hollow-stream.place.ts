import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViHollowStream = {
  id: "01a0ea34-b62d-71f9-8306-ffb3934ca863",
  type: "page-type/place",
  slug: "otherwhere-vi-hollow-stream",
  title: "The Hollow Stream",
  world: "world/wolf-girl-evolution-tails-teeth-and-too-much-food",
  within: "place/otherwhere-vi-greypine-weald",
  facts: [
    {
      fact: "The stream from Moss Hollow runs south a day's walk through pine woods to the Carrow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its banks are pine needles, roots, moss and loose stone; there is no path, only deer trails.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An hour below the hollow the stream drops down a mossy ravine in a small fall.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
    {
      fact: "The ravine's sides are steep and slick; the dry way round is a deer trail on the west bank.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Below the ravine the stream widens and slows through alder and a boar wallow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A sow and her half-grown young use the wallow at night and charge anything near her young.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tonight two young wolves of the pack hunt deer along the stream's middle reach.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The young wolves are curious, not hungry for people, and will shadow a lone walker.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Owls, foxes and bats move along the stream at night; the pines creak in wind.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The great moon lights the stream brightly tonight; under the thick pines it is near black.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
    {
      fact: "Where the stream meets the Carrow, charcoal burners keep a smoking clamp and a hut.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The charcoal burners are Jory Tull, Marda's grown son, and old Wat, his hired man.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Jory Tull is steady and quiet; old Wat is deaf in one ear and fond of his dog.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wat's dog, Burr, is a big shaggy hound who barks at anything coming out of the woods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The charcoal burners stay at the clamp until it is done, five more days, then raft home.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Unhardened bare feet on stone, roots and needles bruise and cut within a few hours.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The stream's banks are pine needles, roots, moss and loose stone, with no path along them.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
    {
      fact: "The ravine's sides are steep, mossy and slick with spray; a dry trail runs along its west rim.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
    {
      fact: "An owl calls along the stream at night, and the pines creak high overhead in the wind.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
  ],
  exits: [
    {
      to: "place/otherwhere-vi-moss-hollow",
      way: "upstream to the hollow",
      direction: "north",
    },
    {
      to: "place/otherwhere-vi-brackenford",
      way: "along the Carrow downstream, half a day past the charcoal camp",
      direction: "south",
    },
  ],
} as const satisfies Place
