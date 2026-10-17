import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const encounters = {
  id: "01a112ff-0b08-77fd-9377-8f9f19eab469",
  type: "page-type/story-written",
  slug: "encounters",
  title: "Encounters",
  world: "world/encounters",
  domain: "domain/explicitness",
  unit: "unit/words",
  chapterBreak: "An encounter ends in its afterglow.",
  coordinatorAgent: "mari-game-master-encounters",
  following: false,
  panels: ["played-panel/player-character", "played-panel/scene-cover"],
  createdAt: "2026-10-06T20:54:26.824Z",
  updatedAt: "2026-10-17T20:49:54.343Z",
} as const satisfies StoryWritten
