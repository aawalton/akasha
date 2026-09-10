import type { Domain } from "../../../domains/domain.page-type.types.ts"

export const emailInbound = {
  id: "01a05bcd-25e2-7b0c-aff6-314192c66a72",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "email-inbound",
  definition: "what an arriving email is read into before anything acts on it",
  parts: [
    "module/inbound-message",
    "module/sender",
    "module/agent-channel",
    "module/inbound-decision",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a mail provider.",
    },
    {
      invariantKind: "departure",
      statement: "Every judgement here is made from headers alone.",
    },
  ],
} as const satisfies Domain
