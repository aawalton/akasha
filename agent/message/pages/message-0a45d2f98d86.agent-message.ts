import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message0a45d2f98d86 = {
  id: "01a0d3ee-bda3-7000-9684-0a45d2f98d86",
  type: "page-type/agent-message",
  slug: "message-0a45d2f98d86",
  to: "seat/alan",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 3dafc6b4e46f9dbfd5cb1c28d9a97f34614f1798 found 2 checks newly refusing.\n`index-is-level-with-the-pages` refused 36 times:\n  inference/generation/image/pages/image-7504db121bd1e1d3.image.referenced-by — the index entry for this file is named by a page and missing from the index\n  inference/generation/image/pages/image-b1ff9c8ea3a780ba.image.referenced-by — the index entry for this file is named by a page and missing from the index\n  inference/generation/image/pages/image-bbcd09eeb9e3efc3.image.referenced-by — the index entry for this file is named by a page and missing from the index\n  inference/generation/image/pages/image-ec69456be1ab875a.image.referenced-by — the index entry for this file is named by a page and missing from the index\n  world/pages/the-wandering-inn/characters/asdf.world-character.referenced-by — the index entry for this file is named by a page and missing from the index\n`tests-pass` refused 1 time:\n  agent/hook/modules/dispatch-boot/dispatch-boot.module.test.ts — Measured between 2026-09-24T14:58:22.030Z and 2026-09-24T14:59:28.383Z. 1 test file failed: agent/hook/modules/dispatch-boot/dispatch-boot.module.test.ts 1 of 20363 tests faile... (741 characters more)\nwhat each of them answered is on the newest row of the audit log beside that check's page. This was meant for `thea`, whom nothing could reach: no seat holds the name `thea`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
