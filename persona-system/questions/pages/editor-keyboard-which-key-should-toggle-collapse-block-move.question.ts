import type { Question } from "../question.page-type.ts"

export const editorKeyboardWhichKeyShouldToggleCollapseBlockMove = {
  id: "019f9538-9924-77fa-ad31-2fd8c4830080",
  pageTypeSlug: "question",
  slug: "editor-keyboard-which-key-should-toggle-collapse-block-move",
  ask: "Editor keyboard: which key should 'toggle-collapse block' move to? It's being freed off Mod+Enter (which returns to its standard job, submit). This changes a key you may have in your fingers, so it's your call.",
  askedBy: "olwen",
  askedIn: "019f9450-57a1-764b-9ea9-ede89f8c0ffd",
  status: "answered",
  offered: [
    "Mod+. (Cmd+. / Ctrl+.) -- my recommendation",
    "Mod+Shift+. -- more conservative, 3-key",
  ],
  answer:
    "I think I want it to stay as CTRL+Enter. This is what I'm used to from Notion (Level 1). If we have a case where these actually conflict (blocks editor inside of an input field?) then we can address the conflict there.",
  closedAt: "2026-07-24T17:44:12.249Z",
  context: "txt",
} as const satisfies Question
