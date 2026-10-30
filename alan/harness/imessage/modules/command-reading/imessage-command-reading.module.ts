import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const imessageCommandReading = {
  id: "01a0685f-c8ed-7000-adfa-6dd4db0e10c3",
  type: "page-type/module",
  slug: "imessage-command-reading",
  definition: "how code writes the messages an iMessage command reads",
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
  createdAt: "2026-09-03T17:45:02.957Z",
  updatedAt: "2026-10-30T15:27:43.438Z",
} as const satisfies Module
