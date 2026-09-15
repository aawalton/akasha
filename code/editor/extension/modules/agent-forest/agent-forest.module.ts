import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentForest = {
  id: "01a0686b-bfe9-798c-9d61-ea31258cd97c",
  type: "module",
  slug: "agent-forest",
  definition: "the seats and the subagents under them hung into the tree the panel draws",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat hangs under the seat that seat names as its parent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat answering to Alan is a root however that seat names its parent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat naming a parent no row answers to is a root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat naming itself as its parent is a root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat already on the descent is not hung beneath itself again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A branch with nothing running is dropped whole.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat naming no name is drawn under its id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat whose place no row states is headless.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Seats are ordered by name and the subagents follow those seats.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A subagent is keyed by the seat that ran that subagent at whatever depth that subagent sits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent naming no id that subagent runs under names no page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent is drawn as running and coloured for the working turn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent the pages name as stopped is drawn as stopped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A path is joined against the repository the answer named rather than a repository guessed here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat name and an id are parted by a byte neither name nor id can have.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here asks the harness anything.",
    },
  ],
} as const satisfies Module
