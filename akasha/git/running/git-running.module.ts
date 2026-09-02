import type { Module } from "@akasha/code-system/module"

export const gitRunning = {
  id: "01a05d7f-23fc-7001-9aaa-0ba0969f501e",
  pageTypeSlug: "module",
  slug: "git-running",
  definition: "a git command run to its end in a repository, and the text it left",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The repository is the first thing a caller states and the arguments follow the repository.",
    },
    {
      invariantKind: "departure",
      statement: "`git` is spelled here rather than by a caller naming it again.",
    },
    {
      invariantKind: "departure",
      statement: "What git said on its output stream is answered unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "A caller wanting the text trimmed trims the text.",
    },
    {
      invariantKind: "departure",
      statement: "A command git could not run throws where the text was asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A command git could not run answers nothing where no text was asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling is stated in milliseconds by a caller that wants a ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "A caller feeding git on its input stream hands the bytes rather than a file.",
    },
    {
      invariantKind: "absence",
      statement: "No command is run here without a repository to run it in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what git said.",
    },
  ],
} as const satisfies Module
