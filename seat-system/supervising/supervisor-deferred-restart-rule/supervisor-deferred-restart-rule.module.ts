import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const supervisorDeferredRestartRule = {
  id: "01a0683e-3dbe-701e-b307-1df87a9c3fff",
  pageTypeSlug: "module",
  type: "module",
  slug: "supervisor-deferred-restart-rule",
  definition: "the deferred-restart readings asked of the deciding command",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An unread verdict has the state that verdict was given and does not fire.",
    },
    {
      invariantKind: "departure",
      statement: "Unread defer windows are null rather than a guess at how long to wait.",
    },
  ],
} as const satisfies Module
