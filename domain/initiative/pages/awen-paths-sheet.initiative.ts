import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenPathsSheet = {
  id: "01a182c6-924a-7621-9c25-8ffeb3cb8384",
  type: "page-type/initiative",
  slug: "awen-paths-sheet",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    { statement: "The sheet groups Paths as active, completed and dormant, not by category." },
    { statement: "The active group shows how many Paths are held out of the slots, as X/Y." },
    { statement: "Each Path shows its progress to its next tier as X/Y." },
    { statement: "A Path in the story's prose shows neither its reward nor its steps." },
  ],
  createdAt: "2026-10-28T13:50:14.089Z",
  updatedAt: "2026-10-28T13:50:14.089Z",
} as const satisfies Initiative
