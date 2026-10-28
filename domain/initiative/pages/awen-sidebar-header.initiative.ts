import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenSidebarHeader = {
  id: "01a183cd-bdc8-7e54-8d05-044e9457a6c4",
  type: "page-type/initiative",
  slug: "awen-sidebar-header",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    { statement: "The header menus within the sidebars use the consistent Voyage pattern." },
    { statement: "The header is present even if there is only one option in that sidebar." },
  ],
  constraints: [
    "Only Alan takes turns in gifted-reborn.",
    "Screenshots use https://alanwalton.com.",
  ],
  createdAt: "2026-10-28T18:37:41.191Z",
  updatedAt: "2026-10-28T18:37:41.191Z",
} as const satisfies Initiative
