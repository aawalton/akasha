import type { Module } from "@akasha/code-system/module"

export const supervisorChildSpawn = {
  id: "01a0683e-3dbe-7010-8b9f-e1ca56441ef8",
  pageTypeSlug: "module",
  slug: "supervisor-child-spawn",
  definition: "a live Claude child adopted where one stands and spawned where none does",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A standing child of this supervisor is adopted rather than joined by a second.",
    },
    {
      invariantKind: "departure",
      statement: "An inherited pid confirmed dead is not respawned.",
    },
    {
      invariantKind: "departure",
      statement: "A spawn is refused where the host is under memory pressure.",
    },
  ],
} as const satisfies Module
