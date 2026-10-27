import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenBeatFlow = {
  id: "01a17ecd-1762-7eac-9a56-f898bbd9d50c",
  type: "page-type/initiative",
  slug: "awen-beat-flow",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    { statement: "A beat goes to the next step as soon as the step before it hands it in." },
    {
      statement:
        "A beat is shown to the player once its numbers and prose are in, and the sheet changes with it.",
    },
    { statement: "Each step is one seat that takes beats as they arrive." },
    {
      statement:
        "Who learned what and the lore a beat settled follow the shown beat without holding it back.",
    },
    {
      statement:
        "A shown beat is never rewritten, and a refused beat reruns only itself and the beats after it.",
    },
    {
      statement:
        "The game master starts a turn only once the recorders it reads have finished the turn before.",
    },
  ],
  constraints: [
    "The game master states every beat of a turn before numbers or prose start on its first beat.",
    "A step's seat is handed one beat at a time, and only while that seat is idle.",
    "Which step a beat still needs is read from the turn's beats file, and is stored nowhere else.",
  ],
  createdAt: "2026-10-27T19:18:52.513Z",
  updatedAt: "2026-10-27T19:18:52.513Z",
} as const satisfies Initiative
