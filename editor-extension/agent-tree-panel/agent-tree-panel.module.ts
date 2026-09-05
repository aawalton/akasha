import type { Module } from "../../code-system/modules/module.page-type.ts"

export const agentTreePanel = {
  id: "01a0686b-bfe9-7a38-b901-76035639ad29",
  pageTypeSlug: "module",
  slug: "agent-tree-panel",
  definition: "the fleet Alan watches, read from the file the service writes, and acted on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The editor calls one function to bring the panel up.",
    },
    {
      invariantKind: "departure",
      statement: "The fleet is read from the file the service writes rather than from the harness.",
    },
    {
      invariantKind: "departure",
      statement:
        "The panel draws the fleet that file holds before any change to that file arrives.",
    },
    {
      invariantKind: "departure",
      statement: "The panel draws again when that file is written and at no other time.",
    },
    {
      invariantKind: "departure",
      statement: "An act on a seat asks for the file again rather than waiting to be told.",
    },
    {
      invariantKind: "departure",
      statement: "A file the service has not written leaves the rows on the screen as they are.",
    },
    {
      invariantKind: "departure",
      statement: "A row is spelled for the panel from the row the file carries.",
    },
    {
      invariantKind: "departure",
      statement: "A color is carried on as its name, the decoration being what reads that name.",
    },
    {
      invariantKind: "departure",
      statement: "One drawing runs at a time.",
    },
    {
      invariantKind: "departure",
      statement:
        "A state arriving mid-drawing is drawn once that drawing ends rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "The rows go up before the terminals are swept.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep that failed is said on the channel and leaves the rows drawn.",
    },
    {
      invariantKind: "departure",
      statement:
        "The badge counts the agents running and the description counts those agents again in words.",
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
      statement: "Every drawing's outcome is recorded as an observation under the panel's name.",
    },
    {
      invariantKind: "departure",
      statement:
        "The terminal tabs holding a seat are published after every drawing and on a tab change.",
    },
    {
      invariantKind: "departure",
      statement: "An act on a row is planned from that row's own state.",
    },
    {
      invariantKind: "departure",
      statement: "Copying a seat's name reaches the seat the same way an act does.",
    },
    {
      invariantKind: "absence",
      statement: "No timer starts a drawing.",
    },
    {
      invariantKind: "absence",
      statement: "No watcher on a seat file is registered here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here hangs a row under another row or draws one.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows the change a step makes to a seat.",
    },
  ],
} as const satisfies Module
