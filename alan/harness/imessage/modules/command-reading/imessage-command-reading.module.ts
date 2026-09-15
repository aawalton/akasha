import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const imessageCommandReading = {
  id: "01a0685f-c8ed-7000-adfa-6dd4db0e10c3",
  type: "page-type/module",
  slug: "imessage-command-reading",
  definition: "the answer an iMessage command builds from the messages it read",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Rows arrive newest first and are answered oldest first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message Alan sent carries an arrow away from Alan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call saying `--json` is answered the records, and one saying nothing the lines.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record carries a message's text whole and a line carries it on one line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The records are answered on one line rather than spread over many.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens a file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here prints.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the mac.",
    },
  ],
} as const satisfies Module
