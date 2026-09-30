import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvRennickHale = {
  id: "01a0ed2d-ba62-7877-9958-bf46662f0017",
  type: "page-type/lore",
  slug: "overwhere-iv-rennick-hale",
  title: "Captain Rennick Hale",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Identify shows Captain Rennick Hale as Human LV 24, Guard LV 30.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Hale is fair but wary of strangers.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "His watch is short of men, and he cannot spare guards for the roads or the Tangle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He questions each traveller the Red Hand robbed: where, how many, which way they went.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "character-other/overwhere-iv-garrett-pell",
      ],
    },
    {
      fact: "A robbery story with no place, no count and no road in it would make him wary.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He has seen men forget all but the blade after a robbery, so he half believes it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Half belief is not trust: he marks such a stranger and has his watch keep an eye out.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "To anyone wanting strength he says: levels come from fighting, and fighting kills fools.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He would send a would-be fighter to the hall, to start on slimes and pests and learn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He knows a first real fight won often brings the System's offer of a class.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The watch drills recruits in the gate yard at dawn; he takes anyone who stays the course.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Watch pay is 6 copper a day with a bunk and board, and the watch is short of hands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Captain Hale is a broad older man in a worn leather coat who works from the gatehouse.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "character-other/overwhere-iv-garrett-pell",
      ],
    },
  ],
} as const satisfies Lore
