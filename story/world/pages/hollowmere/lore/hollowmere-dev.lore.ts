import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const hollowmereDev = {
  id: "01a0fe96-b8a5-7bfe-9c88-9173b13cec72",
  type: "page-type/lore",
  slug: "hollowmere-dev",
  title: "Dev",
  world: "world/hollowmere",
  about: "character-other/hollowmere-dev",
  facts: [
    {
      fact: "Dev Mistry is twenty-three, Priya's boyfriend of two years, and lives at home in Leicester.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-dev",
        "character-other/hollowmere-priya",
      ],
    },
    {
      fact: "Dev rings Priya on Friday nights, and has no magic and no wish for any.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-dev",
        "character-other/hollowmere-priya",
      ],
    },
    {
      fact: "Dev is kind and steady, and Priya has never once been able to surprise him.",
      knowers: ["lore-disclosure/game-master", "character-other/hollowmere-priya"],
    },
  ],
} as const satisfies Lore
