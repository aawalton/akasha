import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const timeProbeWorldOverview = {
  id: "01a1802d-b13e-7b98-ade3-6d73a0432f38",
  type: "page-type/lore",
  slug: "time-probe-world-overview",
  title: "The Test World",
  world: "world/time-probe-world",
  about: "world/time-probe-world",
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
      knowers: ["lore-disclosure/game-master", "character-player/time-probe-player"],
    },
    {
      fact: "The iron sword's edge runs even from hilt to point, with no nick or rolled spot.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies Lore
