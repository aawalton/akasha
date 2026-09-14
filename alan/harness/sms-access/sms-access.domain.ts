import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const smsAccess = {
  id: "01a05b73-2ec6-753d-93f8-fc22c4035cad",
  type: "domain",
  slug: "sms-access",
  definition: "the page type a turned-away inbound SMS would be written under",
  parts: ["page-type/sms-discard"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "No code sits here, so nothing here reads or writes a page.",
    },
    {
      invariantKind: "departure",
      statement: "The sms webhook route reads the relationship pages and messages a seat itself.",
    },
    {
      invariantKind: "gap",
      statement: "An SMS this system turns away lands as a page.",
    },
  ],
} as const satisfies Domain
