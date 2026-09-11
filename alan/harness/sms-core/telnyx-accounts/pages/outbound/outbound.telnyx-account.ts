import type { TelnyxAccount } from "akasha/alan/harness/sms-core/telnyx-accounts/telnyx-account.page-type.types.ts"

export const outbound = {
  id: "01a06864-7aa1-72cb-ab20-899b4251ed86",
  type: "telnyx-account",
  slug: "outbound",
  fromNumber: "+18445122550",
} as const satisfies TelnyxAccount
