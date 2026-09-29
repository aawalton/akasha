import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiWayfarers = {
  id: "01a0ea8a-6438-7ea4-9daf-ddc0cc5b8ddf",
  type: "page-type/lore",
  slug: "otherwhere-xi-wayfarers",
  title: "The Wayfarers",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-organization/otherwhere-xi-wayfarers",
  facts: [
    {
      fact: "The Wayfarers are a gang of Helock's underworld.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Wayfarers smuggled weapons for a coming war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Solfis killed the Wayfarers' underboss, Black Del, a fourth-step hider.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Solfis took over the Wayfarers' network with Lim the Fell-Handed as his second.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
