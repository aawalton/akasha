import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentTreePanel = {
  id: "01a0686b-bfe9-7a38-b901-76035639ad29",
  type: "module",
  slug: "agent-tree-panel",
  definition: "the fleet Alan watches, read from the file the service writes, and acted on",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The editor calls one function to bring the panel up.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The fleet is read from the file the service writes rather than from the harness.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The panel draws the fleet that file has before any change to that file arrives.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The panel draws again when that file is written and at no other time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An act on a seat asks for the file again rather than waiting to be told.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "A row is spelled for the panel from the row the file has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A color is carried on as its name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The decoration reads that name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One drawing runs at a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A state arriving mid-drawing is drawn once that drawing ends rather than dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows go up before the terminals are swept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sweep that failed is said on the channel and leaves the rows drawn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The badge counts the agents running and the description counts those agents again in words.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A filter narrowing the tree has its match count said against the running count.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A read that lost seats says the count lost rather than drawing a short tree in silence.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The terminal tabs with a seat are published after every drawing and on a tab change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An act on a row is planned from that row's own state.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Copying a seat's name reaches the seat the same way an act does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop on a subagent row is handed to `subagent-stopping` with the refresh.",
    },

    {
      invariantKind: "invariant-kind/absence",
      statement: "No watcher on a seat file is registered here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here hangs a row under another row or draws a row.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows the change a step makes to a seat.",
    },
  ],
} as const satisfies Module
