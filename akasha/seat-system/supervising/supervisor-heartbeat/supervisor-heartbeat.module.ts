import type { Module } from "@akasha/code-system/module"

export const supervisorHeartbeat = {
  id: "01a06871-3115-7001-910f-b7d9676eca90",
  pageTypeSlug: "module",
  slug: "supervisor-heartbeat",
  definition: "the beat on which a supervisor records itself and runs its polls",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The first beat runs at once, before the timer is ever set.",
    },
    {
      invariantKind: "departure",
      statement: "A beat falls every thirty seconds.",
    },
    {
      invariantKind: "departure",
      statement: "A null agent id skips the record, and the polls still run.",
    },
    {
      invariantKind: "departure",
      statement: "A poll that throws is logged by name, and the other polls still run.",
    },
    {
      invariantKind: "departure",
      statement: "A record that throws is logged and the beat is otherwise unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "The registration account is null where none is given.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here awaits a beat; a beat returns before its work is done.",
    },
    {
      invariantKind: "departure",
      statement: "A slow poll is never cancelled, so two beats can be in flight at once.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here ever clears the timer it returns.",
    },
  ],
} as const satisfies Module
