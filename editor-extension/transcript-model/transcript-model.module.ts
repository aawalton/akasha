import type { Module } from "../../code-system/modules/module.page-type.ts"

export const transcriptModel = {
  id: "01a064f0-734e-75cf-a1f2-3aaa770e1edf",
  pageTypeSlug: "module",
  slug: "transcript-model",
  definition: "the entries a transcript's lines fold into",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One fold over every line builds the entries rather than gathering results first.",
    },
    {
      invariantKind: "departure",
      statement: "A resumed read and a read from the first byte end at the same entries.",
    },
    {
      invariantKind: "departure",
      statement: "A result arriving after its call is written into the entry already emitted.",
    },
    {
      invariantKind: "departure",
      statement: "A call emitted after its result reads that result off what the fold holds.",
    },
    {
      invariantKind: "departure",
      statement: "A result answers every place a tool use id was emitted rather than the last.",
    },
    {
      invariantKind: "departure",
      statement: "A line is folded like any other and then taken back rather than held out.",
    },
    {
      invariantKind: "departure",
      statement: "A journal is undone from its last note backwards.",
    },
    {
      invariantKind: "departure",
      statement: "The earliest note kept for one key is the note that holds.",
    },
    {
      invariantKind: "departure",
      statement: "A list of emit sites is copied into the journal rather than held.",
    },
    {
      invariantKind: "departure",
      statement: "Results are taken from every record whatever the record's type.",
    },
    {
      invariantKind: "departure",
      statement:
        "Only a user record or an assistant record carrying no meta mark becomes an entry.",
    },
    {
      invariantKind: "departure",
      statement: "A tool's subject is one line of at most 200 characters.",
    },
  ],
} as const satisfies Module
