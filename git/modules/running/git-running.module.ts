import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gitRunning = {
  id: "01a05d7f-23fc-7001-9aaa-0ba0969f501e",
  type: "page-type/module",
  slug: "git-running",
  definition: "a git command run to its end in a repository, and the text it left",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The repository is the first thing a caller states and the arguments follow the repository.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`git` is spelled here rather than by a caller naming `git` again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The text git left on its output stream is answered unchanged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller wanting the text trimmed trims the text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command git could not run throws where the text was asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command git could not run answers nothing where no text was asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A command git could not run is answered as data where the code and both streams were asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller that must not hold its event loop awaits git.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ceiling is stated in milliseconds by a caller that wants a ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller feeding git on its input stream hands the bytes rather than a file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No command is run here without a repository to run that command in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the text git left.",
    },
  ],
} as const satisfies Module
