import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const commitReading = {
  id: "01a0523f-0e48-7c39-8708-125994cc3e59",
  type: "page-type/module",
  slug: "commit-reading",
  definition: "the body a commit holds at a path, read without a git run for each one",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One `git cat-file --batch` answers every body asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer comes back as bytes rather than as text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the commit does not have answers as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A base that names no commit is said out loud.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether a base names a commit is answered without a body being asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A base the reader already asked after is not asked again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader answers what commit a base names, and trees are held under that commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tree read under a commit held is not read again, by this reader or a later one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Trees are held for the last four commits asked about, and an older one's go.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A long-lived process asks about a new commit at every landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body is asked for by its object name rather than by its path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path no tree the commit has names is answered without an ask.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reader is kept between calls and ended where a call throws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader that has answered enough bytes is retired for a fresh reader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader is ended as the process exits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader asked nothing for two seconds is ended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The process is listened to for its exit only while a reader is open.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A copy of this module loaded again is kept for as long as its reader is open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may wait until every reader ended has exited.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The text git says on the error stream is carried into the error thrown.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here commits.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The commit is named by the caller asking.",
    },
  ],
} as const satisfies Module
