import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const transcriptModel = {
  id: "01a064f0-734e-75cf-a1f2-3aaa770e1edf",
  type: "module",
  slug: "transcript-model",
  definition: "the entries a transcript's lines fold into",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One fold over every line builds the entries rather than gathering results first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A resumed read and a read from the first byte end at the same entries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A result arriving after its call is written into the entry already emitted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call emitted after its result reads that result off the state the fold has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A result answers every place a tool use id was emitted rather than the last.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line is folded like every other line and then taken back rather than held out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A journal is undone from its last note backwards.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The earliest note kept for one key is the note that holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A list of emit sites is copied into the journal rather than held.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Results are taken from every record whatever the record's type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a user record or an assistant record with no meta mark becomes an entry.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tool's subject is one line of at most 200 characters.",
    },
  ],
} as const satisfies Module
