import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenPlayLayout = {
  id: "01a17eea-87d3-7805-bce8-e4f10e77a8cc",
  type: "page-type/initiative",
  slug: "awen-play-layout",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    {
      statement: "On desktop, the character and journal places open as a full-height left sidebar.",
    },
    { statement: "On desktop, the chat place opens as a full-height right sidebar." },
    { statement: "A played story's page hides the site's own navigation sidebar." },
    {
      statement:
        "A played story's page has an action entry bar built from the composer the Seats pages use.",
    },
  ],
  constraints: [
    "An open sidebar pushes the turns column aside rather than covering it.",
    "Agents test only on the test story, never on Alan's stories.",
  ],
  createdAt: "2026-10-27T19:51:01.842Z",
  updatedAt: "2026-10-27T19:51:01.842Z",
} as const satisfies Initiative
