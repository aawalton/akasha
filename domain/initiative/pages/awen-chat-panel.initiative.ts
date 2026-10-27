import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenChatPanel = {
  id: "01a17eae-d9b6-7854-a3a3-565b4404a657",
  type: "page-type/initiative",
  slug: "awen-chat-panel",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [{ statement: "A chat message can be sent while a turn is being made." }],
  constraints: [
    "Bracketed asides already in turns and chapters keep being shown as asides.",
    "A chat correction may still be folded into the story and reported to Awen.",
  ],
  createdAt: "2026-10-27T18:45:50.645Z",
  updatedAt: "2026-10-27T22:02:56.650Z",
} as const satisfies Initiative
