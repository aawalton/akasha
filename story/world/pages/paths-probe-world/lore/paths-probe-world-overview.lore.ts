import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const pathsProbeWorldOverview = {
  id: "01a18008-7533-7a01-a535-cf5371d16ff4",
  type: "page-type/lore",
  slug: "paths-probe-world-overview",
  title: "The Test World",
  world: "world/paths-probe-world",
  about: "world/paths-probe-world",
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
      knowers: ["lore-disclosure/game-master", "character-player/paths-probe-player"],
    },
    {
      fact: "The iron sword's edge runs even from hilt to point, with no nick or rolled spot.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:03:22.622Z",
} as const satisfies Lore
