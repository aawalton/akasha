import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const supervisorChildSpawn = {
  id: "01a0683e-3dbe-7010-8b9f-e1ca56441ef8",
  pageTypeSlug: "module",
  type: "module",
  slug: "supervisor-child-spawn",
  definition: "a live Claude child adopted where one is there and spawned where none is",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A child of this supervisor already there is adopted rather than joined by a second.",
    },
    {
      invariantKind: "departure",
      statement: "An inherited pid confirmed dead is not respawned.",
    },
    {
      invariantKind: "departure",
      statement: "A spawn is refused where the host is under memory pressure.",
    },
    {
      invariantKind: "departure",
      statement: "A child spawned afresh runs no task the child before it started.",
    },
    {
      invariantKind: "departure",
      statement: "The open tasks of such a child are taken as closed before the spawn.",
    },
    {
      invariantKind: "departure",
      statement: "An adopted child is the same client.",
    },
    {
      invariantKind: "departure",
      statement: "The open tasks of an adopted child are left alone.",
    },
  ],
} as const satisfies Module
