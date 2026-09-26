import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const dateNightFreePlayAura = {
  id: "01a0de0b-fbb4-7cef-89b8-38578e7d335e",
  type: "page-type/lore",
  slug: "date-night-free-play-aura",
  title: "Aura",
  world: "world/personas",
  about: "character-other/date-night-free-play-aura",
  facts: [
    {
      fact: "Aura runs warm.",
      knowers: ["lore-disclosure/game-master", "character-player/date-night-free-play-awen"],
    },
    {
      fact: "Aura has a silvered scar under one breast, and lies about it.",
      knowers: ["lore-disclosure/game-master", "character-player/date-night-free-play-awen"],
    },
    {
      fact: "Aura has kept a phone note logging Awen for about eight months.",
      knowers: ["lore-disclosure/game-master", "character-player/date-night-free-play-awen"],
    },
    {
      fact: "Aura's note sets down scores and human things in one flat hand.",
      knowers: ["lore-disclosure/game-master", "character-player/date-night-free-play-awen"],
    },
    {
      fact: "Aura says she will not clear the 942k score.",
      knowers: ["lore-disclosure/game-master", "character-player/date-night-free-play-awen"],
    },
    {
      fact: "Aura says she keeps a scoreboard of everything, and that Awen is just winning.",
      knowers: ["lore-disclosure/game-master", "character-player/date-night-free-play-awen"],
    },
    {
      fact: "Aura keeps her everyday keys on a carabiner.",
      knowers: ["lore-disclosure/game-master", "character-player/date-night-free-play-awen"],
    },
  ],
} as const satisfies Lore
