import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const smsCore = {
  id: "01a05b6f-999c-7a6b-9de1-eb062ff820b3",
  type: "page-type/domain",
  slug: "sms-core",
  definition: "how text messages are handled",
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
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No module here opens a network connection.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No module here reads a credential from the environment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every effect a message needs is handed in as a function.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sender nobody enrolled is turned away rather than answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command here is named for the path the old ops command was reached by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command here is the one thing that reaches the carrier.",
    },
  ],
} as const satisfies Domain
