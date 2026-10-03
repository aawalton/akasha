import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const fairweatherProgression = {
  id: "01a10217-bc64-7a62-9cb1-61faa960faa2",
  type: "page-type/world-mechanic",
  slug: "fairweather-progression",
  title: "Progression",
  world: "world/fairweather",
  description:
    "How an adventurer grows: a class gains levels from experience earned on quests, in dungeons and in using its skills, and new skills come with levels. Every adventurer starts at level 1. Guild rank is separate from level: the Adventurers' Guild ranks adventurers from F up to S, and a rank rises only when the guild grants it.",
} as const satisfies WorldMechanic
