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
      statement: "One roster pass answers the live-child component for every seat at once.",
    },
    {
      invariantKind: "departure",
      statement:
        "One scan of the message store answers the send-in-flight component for every seat at once.",
    },
    {
      invariantKind: "departure",
      statement: "A child counts against its principal only while its turn is still to come.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a component.",
    },
  ],
} as const satisfies Module
