import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message3edf21527178 = {
  id: "01a0c549-c81e-7000-be8f-3edf21527178",
  type: "page-type/message",
  slug: "message-3edf21527178",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 7d64e8162036917e1fca925a1998bceb1de1cd01 found 1 check newly refusing.\n`page-matches-its-type` refused 986 times:\n  alan/car-research/car-make/pages/acura/acura.car-make.ts — states `trims motorCount`, which `trims` does not declare\n  alan/car-research/car-make/pages/acura/acura.car-make.ts — states `trims seatingCapacity`, which `trims` does not declare\n  alan/car-research/car-make/pages/acura/acura.car-make.ts — states `trims federalTaxCreditAmount`, which `trims` does not declare\n  alan/car-research/car-make/pages/acura/acura.car-make.ts — states `trims tcoYears`, which `trims` does not declare\n  alan/car-research/car-make/pages/acura/acura.car-make.ts — states `trims tcoAnnualMiles`, which `trims` does not declare\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
