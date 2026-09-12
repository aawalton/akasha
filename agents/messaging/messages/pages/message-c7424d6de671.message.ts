import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageC7424d6de671 = {
  id: "01a0945d-bfce-7000-ac85-c7424d6de671",
  type: "message",
  slug: "message-c7424d6de671",
  to: "thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at f5bf5facbe47a3867e8c106224a70f9b13585193 found 1 check newly refusing.\n`no-refused-syntax` refused 1 time:\n  commands/pages/page/tree/page-tree.command.code.ts — line 266: this literal spells `akasha page tree`, which is this command's own call — read the call off the call the command is handed instead — `no-command-spelling-its-own-call`\n/var/home/walton/.local/state/workstation-services/audit-verdicts.json holds what each of them refuses, whole.\n",
} as const satisfies Message
