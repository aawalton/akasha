import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const dateNightFreePlayFullCombo = {
  id: "01a0dec2-d48d-7c68-af8a-9c02c2cc0f2d",
  type: "page-type/place",
  slug: "date-night-free-play-full-combo",
  title: "Full Combo",
  world: "world/personas",
  facts: [
    {
      fact: "Full Combo is Aura's arcade.",
      knowers: ["lore-disclosure/game-master", "character-player/date-night-free-play-awen"],
    },
    {
      fact: "After hours Full Combo is dark except the cabinets, every machine set to free play.",
      knowers: ["lore-disclosure/game-master", "character-player/date-night-free-play-awen"],
    },
    {
      fact: "Upstairs at Full Combo is a bed by a window over the dark cabinets.",
      knowers: ["lore-disclosure/game-master", "character-player/date-night-free-play-awen"],
    },
    {
      fact: "Cabinet-blue light reaches the room upstairs, and the empty arcade hums below it.",
      knowers: ["lore-disclosure/game-master", "character-player/date-night-free-play-awen"],
    },
    {
      fact: "Full Combo's back door sticks.",
      knowers: ["lore-disclosure/game-master", "character-player/date-night-free-play-awen"],
    },
    {
      fact: "A rhythm cabinet at Full Combo shows a 942k score Aura has not cleared.",
      knowers: ["lore-disclosure/game-master", "character-player/date-night-free-play-awen"],
    },
  ],
} as const satisfies Place
