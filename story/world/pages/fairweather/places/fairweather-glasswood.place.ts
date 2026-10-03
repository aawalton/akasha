import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const fairweatherGlasswood = {
  id: "01a10323-0b9e-7e44-8623-a25fb7f91e5b",
  type: "page-type/place",
  slug: "fairweather-glasswood",
  title: "The Glasswood",
  world: "world/fairweather",
  facts: [
    {
      fact: "The Glasswood is a wood of trees with clear glass bark, which chime when the wind moves them.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
      ],
    },
    {
      fact: "F-rank may go a mile into the Glasswood, to a line of white posts, and no farther.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
      ],
    },
    {
      fact: "A guild clerk in a booth at the east gate sells Glasswood licences and logs every party in and out.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
      ],
    },
    {
      fact: "The Glasswood's edge is an hour's walk east of the east gate, along a cart track through meadows.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
      ],
    },
    {
      fact: "Moonbells grow in shady hollows at the Glasswood's edge, among the roots of the glass trees.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-tamsin"],
    },
    {
      fact: "Moonbells open only between dusk and midnight, and a closed moonbell is worthless to an apothecary.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-tilly",
      ],
    },
    {
      fact: "The moonbell notice is from the apothecary on Mortar Lane: two dozen open moonbells, by morning.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-tamsin"],
    },
    {
      fact: "Glimmer moths with glass wings drift through the Glasswood by night, and are harmless.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
      ],
    },
    {
      fact: "Thornhares live at the Glasswood's edge: rabbit-sized and spined, they bite if cornered.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
      ],
    },
    {
      fact: "On summer nights a pack of bramblewolves hunts the Glasswood's edge: lean, thorn-furred, lamp-eyed.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
      ],
    },
    {
      fact: "Bramblewolves fear fire and loud noise, and go for whoever runs.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
      ],
    },
    {
      fact: "Fallen glass from the trees cuts like a knife, so gatherers in the Glasswood wear gloves.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
      ],
    },
    {
      fact: "An empty ranger's hut sits at the Glasswood's edge, open to any licensed party for shelter.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
      ],
    },
  ],
} as const satisfies Place
