import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiiBelmontPlatform = {
  id: "01a0e9db-4e0f-79ad-85e2-5c323104e29b",
  type: "page-type/place",
  slug: "otherwhere-iii-belmont-platform",
  title: "The Belmont Platform",
  world: "world/super-supportive",
  facts: [
    {
      fact: "Belmont is an elevated L station on the North Side, its platform an island between two tracks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Blue signs on the roof beams read BELMONT and Red Line in white letters.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
    {
      fact: "A lit board overhead scrolls train times in orange: Howard one way, 95th/Dan Ryan the other.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
    {
      fact: "A narrow glass shelter on the platform has a bench and three heat lamps in its roof.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
    {
      fact: "A button on a post, marked PUSH FOR HEAT, lights the lamps for a short while before they click off.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
    {
      fact: "Snow falls past the platform lights, and brick backs of buildings with dark windows face the tracks.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
    {
      fact: "A backlit poster in the shelter advertises the Anesidora Compassion Fund for victims of superhumans.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
    {
      fact: "A stair at the shelter's end, white with snow, leads down to the fare turnstiles and Belmont Avenue.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Before dawn on a Saturday the platform is nearly empty, and trains call every ten minutes or so.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A man in a puffy coat and knit cap waits at the far end, looking at his phone.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
    {
      fact: "The man is a line cook going to an early shift, tired, decent, and wary of strangers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The man in the puffy coat has seen Nala barefoot in a sleep shirt, talking to the air.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
    {
      fact: "Bare feet on the snowy stairs or street go numb within minutes and risk frostbite within the hour.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Riding a train takes a fare card or a phone tapped at the turnstile below.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  within: "place/otherwhere-iii-chicago",
} as const satisfies Place
