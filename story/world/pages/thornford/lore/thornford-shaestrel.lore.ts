import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const thornfordShaestrel = {
  id: "01a14b94-c75e-76c2-a880-eb62dc17cb0a",
  type: "page-type/lore",
  slug: "thornford-shaestrel",
  title: "Shaestrel",
  world: "world/thornford",
  about: "character-other/thornford-shaestrel",
  facts: [
    {
      fact: "Her pale green dress was glamour, and fell from her as fresh birch leaves.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/thornford-nala",
        "character-other/thornford-shaestrel",
      ],
    },
    {
      fact: "She has not yet told Nala her name.",
      knowers: ["lore-disclosure/game-master", "character-other/thornford-shaestrel"],
    },
    {
      fact: "Shaestrel is the name she gives mortals; her true name she tells no one.",
      knowers: ["lore-disclosure/game-master", "character-other/thornford-shaestrel"],
    },
    {
      fact: "A mortal who knows a fae's true name can call that fae to them from anywhere, once.",
      knowers: ["lore-disclosure/game-master", "character-other/thornford-shaestrel"],
    },
  ],
  createdAt: "2026-10-17T20:36:43.997Z",
  updatedAt: "2026-10-17T20:36:43.997Z",
} as const satisfies Lore
