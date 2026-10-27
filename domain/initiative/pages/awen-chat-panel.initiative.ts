import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenChatPanel = {
  id: "01a17eae-d9b6-7854-a3a3-565b4404a657",
  type: "page-type/initiative",
  slug: "awen-chat-panel",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    { statement: "The Assistant tab has its own message box and its own history." },
    { statement: "Both Alan's chat messages and the replies are kept with the story." },
    { statement: "The story's game-master seat answers the Assistant tab." },
    {
      statement:
        "The game master's chat replies go to the Assistant tab rather than into turn prose.",
    },
    { statement: "The action bar treats a bracketed line like any other line." },
    { statement: "A chat message can be sent while a turn is being made." },
  ],
  constraints: [
    "Bracketed asides already in turns and chapters keep being shown as asides.",
    "A chat correction may still be folded into the story and reported to Awen.",
  ],
  createdAt: "2026-10-27T18:45:50.645Z",
  updatedAt: "2026-10-27T19:04:19.625Z",
} as const satisfies Initiative
