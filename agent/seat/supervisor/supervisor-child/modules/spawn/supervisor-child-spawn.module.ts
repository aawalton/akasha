import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorChildSpawn = {
  id: "01a0683e-3dbe-7010-8b9f-e1ca56441ef8",
  type: "page-type/module",
  slug: "supervisor-child-spawn",
  definition: "a live Claude child adopted where one is there and spawned where none is",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A child of this supervisor already there is adopted rather than joined by a second.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An inherited pid confirmed dead is not respawned.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A spawn is refused where the host is under memory pressure.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A child spawned afresh runs no task the child before it started.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The open tasks of such a child are taken as closed before the spawn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An adopted child is the same client.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The open tasks of an adopted child are left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A child spawned afresh runs no subagent the child before it started.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The subagent pages under such a child's seat are taken away before the spawn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The subagent pages of an adopted child are left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That take-down is asked for and left to finish rather than waited on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What this reaches for to adopt, to spawn and to take is handed in.",
    },
  ],
} as const satisfies Module
