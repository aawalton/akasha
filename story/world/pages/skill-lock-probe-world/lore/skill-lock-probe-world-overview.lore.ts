import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const skillLockProbeWorldOverview = {
  id: "01a17ff2-6f78-714b-b205-404df4ab6201",
  type: "page-type/lore",
  slug: "skill-lock-probe-world-overview",
  title: "The Test World",
  world: "world/skill-lock-probe-world",
  about: "world/skill-lock-probe-world",
  facts: [
    {
      fact: "The Test World is one small town of four places, built to try the engine on.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Every name in the Test World says plainly what the thing is.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A healing draught's red liquid tastes of iron and honey.",
      knowers: ["lore-disclosure/game-master", "character-player/skill-lock-probe-player"],
    },
    {
      fact: "The iron sword's edge runs even from hilt to point, with no nick or rolled spot.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies Lore
