import type { Module } from "../../code-system/modules/module.page-type.ts"

export const agentForest = {
  id: "01a0686b-bfe9-798c-9d61-ea31258cd97c",
  pageTypeSlug: "module",
  slug: "agent-forest",
  definition: "the seats and the subagents under them hung into the tree the panel draws",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat hangs under the seat it names as its parent.",
    },
    {
      invariantKind: "departure",
      statement: "A seat answering to Alan is a root however it names its parent.",
    },
    {
      invariantKind: "departure",
      statement: "A seat naming a parent no row answers to is a root.",
    },
    {
      invariantKind: "departure",
      statement: "A seat naming itself as its parent is a root.",
    },
    {
      invariantKind: "departure",
      statement: "A seat already on the descent is not hung beneath itself again.",
    },
    {
      invariantKind: "departure",
      statement: "A branch holding nothing running is dropped whole.",
    },
    {
      invariantKind: "departure",
      statement: "A seat naming no name is drawn under its id.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose place no row states is headless.",
    },
    {
      invariantKind: "departure",
      statement: "Seats are ordered by name and the subagents follow them.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent is keyed by the seat that ran it at whatever depth it sits.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent naming no id it runs under names no page.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent is drawn as running and coloured for the working turn.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path is joined against the repository the answer named rather than one guessed here.",
    },
    {
      invariantKind: "departure",
      statement: "A seat name and an id are parted by a byte neither of them can carry.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks the harness anything.",
    },
  ],
} as const satisfies Module
