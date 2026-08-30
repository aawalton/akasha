import type { Module } from "../../code-system/module/module.page-type.ts"

export const commitReading = {
  id: "01a0523f-0e48-7c39-8708-125994cc3e59",
  pageTypeSlug: "module",
  slug: "commit-reading",
  definition: "the body a commit holds at a path, read without a git run for each one",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "One `git cat-file --batch` answers every body asked for, so reading a hundred paths costs one process rather than a hundred.",
    },
    {
      invariantKind: "departure",
      statement:
        "The answer comes back as bytes, never as text, so a body that is no UTF-8 reads as what it is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path the commit does not carry answers as nothing, and a base that names no commit is said out loud, because the first is an answer and the second is not.",
    },
    {
      invariantKind: "departure",
      statement: "A base is asked after once, so a commit named again is not looked up again.",
    },
    {
      invariantKind: "departure",
      statement:
        "The reader is kept between calls and ended where a call throws, so what is running is either answering or gone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reader that has answered enough bytes is retired for a fresh one, so what it holds does not grow without end.",
    },
    {
      invariantKind: "departure",
      statement: "A reader is ended as the process exits, so nothing outlives what asked for it.",
    },
    {
      invariantKind: "departure",
      statement:
        "What git says on the error stream is carried into what is thrown, so a reader that answered nothing says why.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here judges, writes or commits. It answers what a commit holds, and the commit is named by whoever asks.",
    },
  ],
} as const satisfies Module
