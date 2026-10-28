import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenSidebarEdge = {
  id: "01a183bc-3f69-7bd3-9e04-b8c4491e2c53",
  type: "page-type/initiative",
  slug: "awen-sidebar-edge",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    { statement: "A played story's sidebars are surface level 1." },
    { statement: "A light level 2 border and a shadow mark a sidebar's boundary." },
  ],
  constraints: [
    "Only Alan takes turns in gifted-reborn.",
    "Screenshots use https://alanwalton.com.",
  ],
  createdAt: "2026-10-28T18:18:34.728Z",
  updatedAt: "2026-10-28T18:18:34.728Z",
} as const satisfies Initiative
