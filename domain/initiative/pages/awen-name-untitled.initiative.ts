import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenNameUntitled = {
  id: "01a1840a-6464-7bc2-9537-0d614cfda464",
  type: "page-type/initiative",
  slug: "awen-name-untitled",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [{ statement: "Titles are not shown under the name for now." }],
  constraints: [
    "Only Alan takes turns in gifted-reborn.",
    "Screenshots use https://alanwalton.com.",
  ],
  createdAt: "2026-10-28T19:43:56.003Z",
  updatedAt: "2026-10-28T19:43:56.003Z",
} as const satisfies Initiative
