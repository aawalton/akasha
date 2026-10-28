import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const skillLockProbeWorldFolk = {
  id: "01a17ff2-6f78-7a81-977f-b401420efe9f",
  type: "page-type/lore",
  slug: "skill-lock-probe-world-folk",
  title: "Test Folk",
  world: "world/skill-lock-probe-world",
  about: "world/skill-lock-probe-world",
  facts: [
    {
      fact: "The town's folk are friendly, patient, and used to strangers trying things twice.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The shopkeeper trades in plain copper coin and keeps the shop open from dawn to dusk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A carter bound for the next town wants a hired sword to guard his load on the road.",
      knowers: ["lore-disclosure/game-master", "character-player/skill-lock-probe-player"],
    },
  ],
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies Lore
