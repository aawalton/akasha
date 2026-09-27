import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const dragonsAndDungeonsTheSevenBlackKeys = {
  id: "01a0e39a-0850-70b0-95d0-00ddd11e2020",
  type: "page-type/lore",
  slug: "dragons-and-dungeons-the-seven-black-keys",
  title: "The Seven Black Keys",
  world: "world/personas",
  secrets: "jsonl",
  facts: [
    {
      fact: "Seven black iron keys on a ring lay wrapped in oilcloth under the Warden's lectern.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "Each black key is stamped with a sigil, and Alan knows only one of the seven.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "One key bears the mark scorched into the crossing where Alan refused the bargain.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-aria",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "Mari says the door that key opens is still shut somewhere.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
  ],
} as const satisfies Lore
