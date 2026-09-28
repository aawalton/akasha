import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveTrainingQuest = {
  id: "01a0e9f9-7733-7390-abd7-1ab3d20f78ff",
  type: "page-type/world-mechanic",
  slug: "super-supportive-training-quest",
  title: "Training quest",
  world: "world/super-supportive",
  aliases: ["simulated battle"],
  description:
    "A days-long simulated battle against chaos, managed by the Contract, where squads volunteer for tasks.",
} as const satisfies WorldMechanic
