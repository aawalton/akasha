import type { Module } from "@akasha/code-system/module"

export const supervisorClaimedReconcile = {
  id: "01a0683e-3dbe-7011-964e-6ba8498d44b5",
  pageTypeSlug: "module",
  slug: "supervisor-claimed-reconcile",
  definition: "messages a seat claimed and ended without consuming, released again",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A message the transcript shows was injected is held rather than released.",
    },
    {
      invariantKind: "departure",
      statement: "Redelivery waits for its window before anything is read as unconsumed.",
    },
    {
      invariantKind: "departure",
      statement: "A reconcile that faults does not stop the resume it runs under.",
    },
  ],
} as const satisfies Module
