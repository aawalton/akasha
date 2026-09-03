import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const messageWarrantAnnounce = {
  id: "01a0675b-16f1-7010-857b-f9b704380931",
  pageTypeSlug: "domain",
  slug: "message-warrant-announce",
  definition: "the sender has said its piece and waits for nothing",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An announce is not a reason for its sender to keep running.",
    },
  ],
} as const satisfies Domain
