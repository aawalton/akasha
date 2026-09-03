import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const smsCore = {
  id: "01a05b6f-999c-7a6b-9de1-eb062ff820b3",
  pageTypeSlug: "workspace-package",
  slug: "sms-core",
  definition: "how a text message from a phone reaches the seat that answers it",
  manifest: "json",
  partSlugs: [
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
    "command/sms-acting-account",
    "command/sms-send",
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
} as const satisfies WorkspacePackage
