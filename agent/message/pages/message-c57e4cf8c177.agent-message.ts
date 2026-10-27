import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageC57e4cf8c177 = {
  id: "01a17f5f-81d0-7398-aeff-c57e4cf8c177",
  type: "page-type/agent-message",
  slug: "message-c57e4cf8c177",
  to: "seat/alan",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at c89ad65a9bd60072defa60653d6ab0da2960d87e found 1 check newly refusing.\n`no-re-export` refused 10 times:\n  story/world/pages/test-world/stories/played/clone-probe/mechanics/checks/clone-probe-action-check.world-check.settling.code.ts — line 1 sends on `Held`, which came from `akasha/story/world/pages/test-world/stories/played/test-story/mechanic... (127 characters more)\n  story/world/pages/test-world/stories/played/clone-probe/mechanics/checks/clone-probe-action-check.world-check.settling.code.ts — line 1 sends on `Reach`, which came from `akasha/story/world/pages/test-world/stories/played/test-story/mechani... (128 characters more)\n  story/world/pages/test-world/stories/played/clone-probe/mechanics/checks/clone-probe-action-check.world-check.settling.code.ts — line 5 sends on `settled`, which came from `akasha/story/world/pages/test-world/stories/played/test-story/mecha... (130 characters more)\n  story/world/pages/test-world/stories/played/clone-probe/mechanics/checks/clone-probe-time-passing.world-check.settling.code.ts — line 1 sends on `settled`, which came from `akasha/story/world/pages/test-world/stories/played/test-story/mecha... (130 characters more)\n  story/world/pages/test-world/stories/played/clone-probe/mechanics/checks/clone-probe-training.world-check.settling.code.ts — line 1 sends on `added`, which came from `akasha/story/world/pages/test-world/stories/played/test-story/mechanics/c... (120 characters more)\nwhat each of them answered is on the newest row of the audit log beside that check's page. This was meant for `thea`, whom nothing could reach: no seat holds the name `thea`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
  createdAt: "2026-10-27T21:58:48.452Z",
  updatedAt: "2026-10-27T21:58:48.452Z",
} as const satisfies AgentMessage
