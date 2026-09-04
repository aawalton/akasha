import type { TelnyxAccount } from "../../telnyx-account.page-type.ts"

export const outbound = {
  id: "01a06864-7aa1-72cb-ab20-899b4251ed86",
  pageTypeSlug: "telnyx-account",
  slug: "outbound",
  fromNumber: "+18445122550",
} as const satisfies TelnyxAccount
