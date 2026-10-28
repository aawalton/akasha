import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenBeatFlow = {
  id: "01a17ecd-1762-7eac-9a56-f898bbd9d50c",
  type: "page-type/initiative",
  slug: "awen-beat-flow",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [],
  constraints: [
    "The game master states every beat of a turn before numbers or prose start on its first beat.",
    "A step's seat is handed one beat at a time, and only while that seat is idle.",
    "Which step a beat still needs is read from the turn's beats file, and is stored nowhere else.",
  ],
  createdAt: "2026-10-27T19:18:52.513Z",
  updatedAt: "2026-10-28T00:39:53.376Z",
} as const satisfies Initiative
