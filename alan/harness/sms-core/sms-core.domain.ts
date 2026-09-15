import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const smsCore = {
  id: "01a05b6f-999c-7a6b-9de1-eb062ff820b3",
  type: "domain",
  slug: "sms-core",
  definition: "how a text message from a phone reaches the seat that answers it",
  parts: [
    "module/acting-account",
    "module/handle-inbound",
    "module/normalize",
    "module/sms-identity",
    "module/telnyx-inbound",
    "module/telnyx-send",
    "module/verify-signature",
    "page-type/telnyx-account",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "No module here opens a network connection.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No module here reads a credential from the environment.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every effect a message needs is handed in as a function.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sender nobody enrolled is turned away rather than answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command here is named for the path the old ops command was reached by.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command here is the one thing that reaches the carrier.",
    },
  ],
} as const satisfies Domain
