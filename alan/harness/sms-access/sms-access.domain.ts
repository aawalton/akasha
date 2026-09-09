import type { Domain } from "../../../domains/domain.page-type.ts"

export const smsAccess = {
  id: "01a05b73-2ec6-753d-93f8-fc22c4035cad",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "sms-access",
  definition: "the pages an inbound SMS reads and writes",
  parts: ["module/sms-allowlist", "module/sms-discard", "page-type/sms-discard"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the SMS carrier.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches Supabase.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a page.",
    },
    {
      invariantKind: "gap",
      statement: "The pages an inbound SMS reads and writes are pages akasha has.",
    },
  ],
} as const satisfies Domain
