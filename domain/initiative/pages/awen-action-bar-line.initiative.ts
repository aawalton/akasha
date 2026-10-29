import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenActionBarLine = {
  id: "01a187fd-4de6-7fdd-9397-a166af6eedaa",
  type: "page-type/initiative",
  slug: "awen-action-bar-line",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    { statement: "The main play panel's action bar is one line by default, like the chat bar." },
  ],
  constraints: [
    "Only Alan takes turns in gifted-reborn.",
    "Screenshots use https://alanwalton.com.",
  ],
  createdAt: "2026-10-29T14:08:07.140Z",
  updatedAt: "2026-10-29T14:08:07.140Z",
} as const satisfies Initiative
