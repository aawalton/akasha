import type { WorkspacePackage } from "../code-system/workspace-package/workspace-package.page-type.ts"

export const seatSystem = {
  id: "01a04f23-d2da-7b20-a543-142de383ac28",
  pageTypeSlug: "workspace-package",
  slug: "seat-system",
  definition: "a place an agent works from, and what stands there while it does",
  manifest: "json",
  partSlugs: ["page-type/seat", "module/seat-reading"],
  invariants: [
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
      statement: "A seat assigned an initiative goes when that initiative's page does.",
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
      invariantKind: "constraint",
      statement: "A seat outlives the editor showing it and the agent sitting in it.",
    },
  ],
} as const satisfies WorkspacePackage
