import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenChatPanel = {
  id: "01a17eae-d9b6-7854-a3a3-565b4404a657",
  type: "page-type/initiative",
  slug: "awen-chat-panel",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    {
      statement: "The chat place has a panel with a tab row holding one tab, Assistant.",
      workingMemory:
        "The chat place is `story/ui/played-panel/panel-place/pages/chat.panel-place.ts`. Brackets today: `action-bar-message` module, the action bar, `action-bar-answering` (feedback becomes an agent message to the story's coordinator seat), replies as bracketed paragraphs in the next turn's prose, drawn by `chapter-prose`. Roles: `roleplay.role.ts` Out Of Character, Fold In Corrections, Report To Awen. Reusable: the seat conversation view and `SeatComposer` under `agent/seat/`.\n",
    },
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
  updatedAt: "2026-10-27T18:45:50.645Z",
} as const satisfies Initiative
