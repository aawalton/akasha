import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenPlaySidebars = {
  id: "01a17e9d-4b8e-70d5-994a-b1b6cf83a45b",
  type: "page-type/initiative",
  slug: "awen-play-sidebars",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    {
      statement: "The aside place is replaced by the character, journal, map and chat places.",
      workingMemory:
        "The play page is under `story/world/stories/played/`; layout in `modules/played-layout/`. Panels are pages under `story/ui/played-panel/pages/`, places under `story/ui/played-panel/panel-place/pages/`. Voyage (`domain/voyage`) is the reference: sidebars about 500px, Character and Journal left, Map and Chat right. Alan decided the scene-cover and player-intent panels go in the journal place.\n",
    },
    {
      statement: "A played story's top bar has a button for each of those places that has a panel.",
    },
    { statement: "A button stays highlighted while the place it opens is open." },
    {
      statement: "Character and journal open in a left sidebar, and map and chat in a right one.",
    },
    { statement: "Each sidebar shows one place at a time, and both sidebars can be open at once." },
    { statement: "An open sidebar pushes the turns aside rather than covering them." },
    {
      statement:
        "Where both sidebars leave the turns too narrow to read, opening one side closes the other.",
    },
    { statement: "On a phone, a bottom tab bar opens each place full screen over the turns." },
    { statement: "On a phone, an open place has a switch to the other place on its side." },
    { statement: "The player-character panels are drawn in the character place." },
    { statement: "The quest-list, story-so-far and time panels are drawn in the journal place." },
    { statement: "The scene-cover and player-intent panels are drawn in the journal place." },
  ],
  constraints: ["Nothing inside a panel changes but the place that panel is drawn in."],
  createdAt: "2026-10-27T18:26:40.142Z",
  updatedAt: "2026-10-27T18:51:01.531Z",
} as const satisfies Initiative
