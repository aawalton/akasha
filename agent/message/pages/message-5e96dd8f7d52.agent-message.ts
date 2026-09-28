import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message5e96dd8f7d52 = {
  id: "01a0e86c-0495-7000-affe-5e96dd8f7d52",
  type: "page-type/agent-message",
  slug: "message-5e96dd8f7d52",
  to: "seat/alan",
  from: "audit-running",
  warrant: "announce",
  body: "a run at 843cf3254191e3aec4782fe4827dc802e03a53a3 over 1 check asked for by name found 1 check newly refusing.\n`typecheck` refused 2 times:\n  alan/harness/errors-client/modules/error-reporting/error-reporting.module.code.ts — line 8: TS2304: Cannot find name 'window'.\n  alan/harness/errors-client/modules/error-reporting/error-reporting.module.code.ts — line 12: TS2304: Cannot find name 'window'.\nwhat each of them answered is on the newest row of the audit log beside that check's page. This was meant for `thea`, whom nothing could reach: no seat holds the name `thea`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
