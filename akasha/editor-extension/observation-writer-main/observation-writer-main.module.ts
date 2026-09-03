import type { Module } from "../../code-system/modules/module.page-type.ts"

export const observationWriterMain = {
  id: "01a0680d-8b55-7000-aaf8-d49716839df8",
  pageTypeSlug: "module",
  slug: "observation-writer-main",
  definition:
    "the process a window's observations are landed by, taking asks on stdin and answering on fd 3",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Asks arrive as newline-delimited JSON on stdin.",
    },
    {
      invariantKind: "departure",
      statement: "Answers leave as newline-delimited JSON on the fourth file descriptor.",
    },
    {
      invariantKind: "departure",
      statement:
        "Answers go on a pipe of their own because the landing writes to stdout and stderr.",
    },
    {
      invariantKind: "absence",
      statement: "A diagnostic the landing prints is no answer.",
    },
    {
      invariantKind: "departure",
      statement: "Writes are landed one at a time in the order the host asked in.",
    },
    {
      invariantKind: "departure",
      statement: "A second drain does not start while the first is inside a write.",
    },
    {
      invariantKind: "departure",
      statement: "The queue is drained before this process exits.",
    },
    {
      invariantKind: "departure",
      statement: "Stdin closing is what makes this drain and exit.",
    },
    {
      invariantKind: "departure",
      statement: "A host killed and a host disposed both close stdin.",
    },
    {
      invariantKind: "departure",
      statement: "A short write to the answer pipe is finished rather than left a prefix.",
    },
    {
      invariantKind: "departure",
      statement: "A line on stdin that is no ask is thrown away with a word on stderr.",
    },
    {
      invariantKind: "departure",
      statement: "An ask missing a field is taken with that field's default rather than refused.",
    },
    {
      invariantKind: "constraint",
      statement: "A landing that throws is answered as a refusal carrying status 500.",
    },
    {
      invariantKind: "constraint",
      statement: "Nothing listening on the fourth descriptor is said on stderr and exits nonzero.",
    },
    {
      invariantKind: "departure",
      statement: "The window's page is found from the checkout roots this process stands in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here defers a commit.",
    },
    {
      invariantKind: "absence",
      statement: "No landing journal is written here.",
    },
  ],
} as const satisfies Module
