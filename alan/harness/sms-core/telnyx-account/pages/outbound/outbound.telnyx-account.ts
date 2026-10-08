import type { TelnyxAccount } from "akasha/alan/harness/sms-core/telnyx-account/telnyx-account.page-type.types.ts"

export const outbound = {
  id: "01a06864-7aa1-72cb-ab20-899b4251ed86",
  type: "page-type/telnyx-account",
  slug: "outbound",
  fromNumber: "+13854830021",
  createdAt: "2026-09-03T17:50:10.593Z",
  updatedAt: "2026-09-16T13:59:30.000Z",
} as const satisfies TelnyxAccount
