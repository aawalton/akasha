import type { Module } from "../../code-system/modules/module.page-type.ts"

export const agentTreePanel = {
  id: "01a0686b-bfe9-7a38-b901-76035639ad29",
  pageTypeSlug: "module",
  slug: "agent-tree-panel",
  definition: "the fleet Alan watches, read on a poll and on a seat file changing, and acted on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The editor calls one function to bring the panel up.",
    },
    {
      invariantKind: "departure",
      statement: "The fleet is read once as the panel starts and every second after that.",
    },
    {
      invariantKind: "departure",
      statement: "A seat file changing is waited out before the fleet is read again.",
    },
    {
      invariantKind: "departure",
      statement: "A second change during that wait replaces the first rather than adding to it.",
    },
    {
      invariantKind: "departure",
      statement: "A seat file change drops the answers held from the last read.",
    },
    {
      invariantKind: "departure",
      statement: "One read runs at a time.",
    },
    {
      invariantKind: "departure",
      statement:
        "A trigger arriving mid-read waits on the read in flight rather than starting one.",
    },
    {
      invariantKind: "departure",
      statement:
        "The badge counts the agents running and the description counts them again in words.",
    },
    {
      invariantKind: "departure",
      statement: "A filter narrowing the tree has its match count said against the running count.",
    },
    {
      invariantKind: "departure",
      statement:
        "A read that lost seats says how many rather than drawing a short tree in silence.",
    },
    {
      invariantKind: "departure",
      statement: "A read that failed says the harness cannot be reached.",
    },
    {
      invariantKind: "departure",
      statement: "Every read's outcome is recorded as an observation under the panel's name.",
    },
    {
      invariantKind: "departure",
      statement:
        "The terminal tabs holding a seat are published after every read and on a tab change.",
    },
    {
      invariantKind: "departure",
      statement: "A row's own state is what an act on that row is planned from.",
    },
    {
      invariantKind: "departure",
      statement: "Copying a seat's name reaches the seat the same way an act does.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here hangs a row under another or draws one.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what a step does to a seat.",
    },
  ],
} as const satisfies Module
