import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVSerrinford = {
  id: "01a0e9fd-9ce6-7cea-9cd4-0379b6b8ce14",
  type: "page-type/place",
  slug: "otherwhere-v-serrinford",
  title: "Serrinford",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-serrin-vale",
  exits: [
    {
      to: "place/otherwhere-v-woodcutters-track",
      way: "Out the Wood Gate and up the track four and a half miles to the log bridge; an hour and a half.",
      direction: "north",
    },
    {
      to: "place/otherwhere-v-serrin-river",
      way: "Out the River Gate and down the landing to the ford, the boats and the river road.",
      direction: "south",
    },
    {
      to: "place/otherwhere-v-hillboar-oaks",
      way: "Out the River Gate, over the ford's gravel line, then a mile of meadow to the oaks; forty minutes.",
      direction: "south",
    },
    {
      to: "place/otherwhere-v-serrinford-green",
      way: "Along the lanes inside the palisade to the green at the village's heart.",
    },
  ],
  facts: [
    {
      fact: "Serrinford is a palisaded village of about two hundred and twenty on the Serrin's north bank.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Serrinford is six miles from Fern Hollow: the brook to the track, then the track downhill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A palisade of sharpened scalebark logs twelve feet high rings the village.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Wood Gate opens north onto the track; the River Gate opens south onto the ford.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Both gates close at dusk and open at first light; a watchman with a horn keeps each by night.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "About forty timber houses roofed with grey bark scales crowd inside the palisade.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Serrinford smells of woodsmoke, sawdust, pigs, river mud and baking barley bread.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Serrinford lives by felling scalebark and rafting it to Harrowmere; most men are woodcutters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its folk also keep pigs, goats, barley plots and bean rows on the flats by the river.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Everyone in Serrinford speaks Elothian; no one there speaks any tongue from beyond Elothia.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Only the headman, the warden, the shrine-keeper and a few others read Elothian letters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No one in Serrinford can cast a spell that teaches a language.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Barter is common in Serrinford; coin is short and saved for the Harrowmere trader.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "By custom a stranger at the gate is given gate-bread: a heel of bread and a cup of water.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A stranger who takes gate-bread may sleep one night in the headman's longhouse.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "After one night a stranger in Serrinford must work, pay, or be walked out the gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Strangers are brought before the headman; the rangers are sent for if one seems dangerous.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In Serrinford only the very poor and penitents go barefoot; a barefoot woman draws stares.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Serrinford's folk touch the shrine's lintel stone as they go by it, for the ancestors.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Market is held on the green every sixth day; the next falls on day four of Nala's time here.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Harrowmere trader's boat reaches Serrinford every ten days; next on day four.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Treeborn traders come to the green at each new moon; the next new moon is on day nine.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The village mourns three rangers killed at Thornmouth a month ago; their shields hang at the shrine.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
