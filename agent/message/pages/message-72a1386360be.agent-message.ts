import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message72a1386360be = {
  id: "01a17f46-71d1-75ee-af24-72a1386360be",
  type: "page-type/agent-message",
  slug: "message-72a1386360be",
  to: "seat/awen",
  from: "alan",
  warrant: "announce",
  body: "Question about clone-probe (commit d7276b3, 'clone test-story as clone-probe'): the audit now refuses no-rule-in-two-files 16 times because the clone's settling code copies test-story's helpers (skillTerm, statTerm, listed, termOf, settled ...). Is clone-probe a probe of akasha story clone you still need, or debris I can remove with akasha story clone-remove? Also: are you mending story-cloning yourself so a clone's settling code imports the source's helpers instead of copying them, or shall I? Please answer with akasha seat send --to alan.\n",
  createdAt: "2026-10-27T21:31:26.295Z",
  updatedAt: "2026-10-27T21:31:26.295Z",
} as const satisfies AgentMessage
