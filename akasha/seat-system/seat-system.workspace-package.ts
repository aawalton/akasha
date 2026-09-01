import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const seatSystem = {
  id: "01a04f23-d2da-7b20-a543-142de383ac28",
  pageTypeSlug: "workspace-package",
  slug: "seat-system",
  definition: "a place an agent works from, and what stands there while it does",
  manifest: "json",
  partSlugs: [
    "page-type/seat",
    "page-type/subagent",
    "module/seat-launching",
    "module/seat-name-claim",
    "module/seat-naming",
    "module/seat-reading",
    "module/seat-stating",
    "module/seat-stopping",
    "module/subagent-presence",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every reader of a seat reads it from akasha.",
    },
    {
      invariantKind: "departure",
      statement: "No writer of a seat writes it outside akasha.",
    },
    {
      invariantKind: "departure",
      statement: "No writer of a subagent writes it outside akasha.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's page stands while an agent is present in it.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's page goes when none is.",
    },
    {
      invariantKind: "departure",
      statement: "A seat outlives the initiative it was assigned.",
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
      statement: "What a seat holds is either declared of it or observed of it.",
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
      invariantKind: "departure",
      statement: "What an agent has read is found by the seat it works from.",
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
        "Every writer of a seat's uncommitted values takes a lock keyed on the file it writes.",
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
      statement: "A seat outlives the editor showing it and the agent sitting in it.",
    },
    {
      invariantKind: "departure",
      statement: "A seat is stopped by ending its processes.",
    },
    {
      invariantKind: "absence",
      statement: "No command sends a message from one seat to another.",
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
