import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const seatSystem = {
  id: "01a04f23-d2da-7b20-a543-142de383ac28",
  pageTypeSlug: "workspace-package",
  slug: "seat-system",
  definition: "a place an agent works from, and what stands there while it does",
  manifest: "json",
  partSlugs: [
    "page-type/agent-settings",
    "page-type/log-source",
    "page-type/message",
    "page-type/seat",
    "page-type/seat-log-day",
    "page-type/subagent",
    "page-type/supervisor-action",
    "domain/seat-capability",
    "domain/seat-declaration",
    "domain/seat-observation",
    "module/channel-delivery",
    "module/keeper-unrevivable-push",
    "module/recipient-resolver-config",
    "module/recipient-resolver-deps",
    "module/recipient-resolver-inbound",
    "module/recipient-resolver-registry",
    "module/recipient-resolver-revive",
    "module/recipient-resolver-tick",
    "module/recipient-resolver-tick-deps",
    "module/seat-launching",
    "module/seat-name-claim",
    "module/seat-naming",
    "module/seat-pending",
    "module/seat-reading",
    "module/seat-stating",
    "module/seat-stopping",
    "module/subagent-presence",
    "module/supervisor-idle-decide",
    "module/supervisor-iteration-outcome-db",
    "module/supervisor-lifecycle-death-write",
    "module/supervisor-precliff-restart-decide",
    "module/supervisor-proxy-adoption-decide",
    "module/supervisor-proxy-liveness-decide",
    "module/supervisor-limit-resume-effects",
    "module/supervisor-log-path",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every reader of a seat reads the seat from akasha.",
    },
    {
      invariantKind: "departure",
      statement: "No writer of a seat writes the seat outside akasha.",
    },
    {
      invariantKind: "departure",
      statement: "No writer of a subagent writes the subagent outside akasha.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's page remains while an agent is present in the seat.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's page goes when no agent is present in the seat.",
    },
    {
      invariantKind: "departure",
      statement: "A seat outlives the initiative the seat was assigned.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose initiative is done is assigned again.",
    },
    {
      invariantKind: "departure",
      statement: "A seat on call is not swept.",
    },
    {
      invariantKind: "departure",
      statement: "What a seat holds is either declared of the seat or observed of the seat.",
    },
    {
      invariantKind: "upkeep",
      statement: "Every value observed of a seat is declared on its page type.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's id is the agent's id.",
    },
    {
      invariantKind: "constraint",
      statement: "What is observed of a seat changes every few seconds.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A write that commits cannot carry what is observed of a seat and can be observed again.",
    },
    {
      invariantKind: "departure",
      statement: "What a seat is bound to cannot be observed again.",
    },
    {
      invariantKind: "departure",
      statement: "What a seat is bound to is committed.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every writer of a seat's uncommitted values takes a lock keyed on the file the writer writes.",
    },
    {
      invariantKind: "departure",
      statement:
        "A supervisor restarts onto current code without interrupting the session it holds.",
    },
    {
      invariantKind: "departure",
      statement: "A seat survives its own restart.",
    },
    {
      invariantKind: "constraint",
      statement: "A seat outlives the editor showing the seat and the agent sitting in the seat.",
    },
    {
      invariantKind: "departure",
      statement: "A seat is stopped by ending its processes.",
    },
    {
      invariantKind: "absence",
      statement: "No command sends a message from one seat to another seat.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing outside akasha says what a seat is.",
    },
    {
      invariantKind: "gap",
      statement: "A seat at work keeps working while its page moves.",
    },
  ],
} as const satisfies WorkspacePackage
