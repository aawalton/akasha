import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readingInFlight = {
  id: "01a0c54e-ace3-73fc-853c-2f33dfe5c8f7",
  type: "page-type/module",
  slug: "reading-in-flight",
  definition: "the reader every page read under a request is answered for",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request names its reader once, and every read under it is that reader's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read naming its reader this way needs no argument passed down to it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request is read as a reader only where a read under it asks who is reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request serving a file therefore costs no session reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One request reads its session once however many reads that request makes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read the system makes for itself is said to be the system's where it is made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read outside any request is the system's, as a command run by hand is.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A bundle inlines its own copy of a module the server also loads from the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The store a reader rides in is one the runtime shares, so every copy reads the same one.",
    },
  ],
} as const satisfies Module
