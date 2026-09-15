import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const imessageCommandReading = {
  id: "01a0685f-c8ed-7000-adfa-6dd4db0e10c3",
  type: "module",
  slug: "imessage-command-reading",
  definition: "the answer an iMessage command builds from the messages it read",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Rows arrive newest first and are answered oldest first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message Alan sent carries an arrow away from Alan.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A call saying `--json` is answered the records, and one saying nothing the lines.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record carries a message's text whole and a line carries it on one line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The records are answered on one line rather than spread over many.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here opens a file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here prints.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches the mac.",
    },
  ],
} as const satisfies Module
