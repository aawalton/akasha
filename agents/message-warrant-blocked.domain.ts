import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const messageWarrantBlocked = {
  id: "01a0675b-16f2-756c-8b26-405e72c989d4",
  pageTypeSlug: "domain",
  slug: "message-warrant-blocked",
  definition: "the sender is stopped until this message is answered",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The answer reaches the sender's mailbox.",
    },
  ],
} as const satisfies Domain
