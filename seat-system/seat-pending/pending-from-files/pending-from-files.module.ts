import type { Module } from "@akasha/code-system/module"

export const pendingFromFiles = {
  id: "01a0691b-4f65-762a-b97c-48d97a317e76",
  pageTypeSlug: "module",
  slug: "pending-from-files",
  definition: "the file-backed pending components of every seat, read in one pass over the fleet",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One reading of the roster answers the live-subagent component for every seat.",
    },
    {
      invariantKind: "departure",
      statement:
        "One scan of the message store answers the send-in-flight component for every seat at once.",
    },
    {
      invariantKind: "departure",
      statement: "A seat has a live subagent while a subagent page is there under that seat.",
    },
    {
      invariantKind: "gap",
      statement: "A page outliving the subagent named on the page reads as a live subagent.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a component.",
    },
  ],
} as const satisfies Module
