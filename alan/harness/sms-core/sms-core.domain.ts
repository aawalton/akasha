import type { Domain } from "../../../domains/domain.page-type.types.ts"

export const smsCore = {
  id: "01a05b6f-999c-7a6b-9de1-eb062ff820b3",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "sms-core",
  definition: "how a text message from a phone reaches the seat that answers it",
  parts: [
    "module/verify-signature",
    "module/telnyx-inbound",
    "module/sms-identity",
    "module/normalize",
    "module/handle-inbound",
    "module/telnyx-send",
    "module/acting-account",
    "module/jenny-handler-routing",
    "module/ki-handler-routing",
    "page-type/telnyx-account",
    "module/sms-command-reading",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "No module here opens a network connection.",
    },
    {
      invariantKind: "absence",
      statement: "No module here reads a credential from the environment.",
    },
    {
      invariantKind: "departure",
      statement: "Every effect a message needs is handed in as a function.",
    },
    {
      invariantKind: "departure",
      statement: "A sender nobody enrolled is turned away rather than answered.",
    },
    {
      invariantKind: "departure",
      statement: "A command here is named for the path the old ops command was reached by.",
    },
    {
      invariantKind: "departure",
      statement: "A command here is the one thing that reaches the carrier.",
    },
  ],
} as const satisfies Domain
