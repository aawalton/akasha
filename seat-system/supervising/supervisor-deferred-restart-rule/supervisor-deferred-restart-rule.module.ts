import type { Module } from "@akasha/code-system/module"

export const supervisorDeferredRestartRule = {
  id: "01a0683e-3dbe-701e-b307-1df87a9c3fff",
  pageTypeSlug: "module",
  slug: "supervisor-deferred-restart-rule",
  definition: "the deferred-restart readings asked of the deciding command",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An unread verdict holds the state it was given and does not fire.",
    },
    {
      invariantKind: "departure",
      statement: "Unread defer windows are null rather than a guess at how long to wait.",
    },
  ],
} as const satisfies Module
