import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const dragonsAndDungeonsCeri = {
  id: "01a0e39a-084f-781b-bbe2-5450f47560f9",
  type: "page-type/lore",
  slug: "dragons-and-dungeons-ceri",
  title: "Ceri",
  world: "world/personas",
  about: "character-other/dragons-and-dungeons-ceri",
  facts: [
    {
      fact: "Ceri is an amethyst dragon, Aria's little sister, all cool poise and distance.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-aria",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "Aria says Ceri will pretend to be too aloof to be charmed by Alan, and be wrong.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-aria",
      ],
    },
    {
      fact: "Ceri has not yet come down to the table; she comes when she comes.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-aria",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
  ],
} as const satisfies Lore
