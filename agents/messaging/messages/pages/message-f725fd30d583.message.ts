import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageF725fd30d583 = {
  id: "01a095ed-72bf-7000-8d8e-f725fd30d583",
  type: "message",
  slug: "message-f725fd30d583",
  to: "thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 99172024da6f4db1ea1eb6c93653cde078bf8cf0 found 1 check newly refusing.\n`typecheck` refused 3 times:\n  agents/seats/modules/control/seat-control.module.code.ts — line 3: TS2307: Cannot find module 'akasha/seat-system/seat-beside/seat-beside.module.code.ts' or its corresponding type declarations.\n  agents/seats/modules/record/seat-record.module.code.ts — line 3: TS2307: Cannot find module 'akasha/seat-system/seat-beside/seat-beside.module.code.ts' or its corresponding type declarations.\n  agents/seats/modules/turn-pending/seat-turn-pending.module.code.ts — line 4: TS2307: Cannot find module 'akasha/seat-system/seat-beside/seat-beside.module.code.ts' or its corresponding type declarations.\n/var/home/walton/.local/state/workstation-services/audit-verdicts.json holds what each of them refuses, whole.\n",
} as const satisfies Message
