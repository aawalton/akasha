import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const git = {
  id: "01a05d7f-23fc-7000-b2b7-266f4611121a",
  type: "page-type/domain",
  slug: "git",
  definition: "git run in a repository, and what it said",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "git" }],
  parts: [
    "domain/oid",
    "module/commit-reading",
    "module/committing",
    "module/git-answering",
    "module/git-capping",
    "module/git-dir",
    "module/git-pathspec",
    "module/git-pushing",
    "module/git-running",
    "module/git-store-sweeping",
    "module/head-commit",
    "module/holding",
    "module/porcelain-status",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A repository is named to git by `-C` rather than by the folder a caller is in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder git keeps a checkout in is asked of git rather than spelled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is under that folder is no page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What akasha left under that folder goes by a sweep rather than by a change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller wanting a throw and a caller wanting nothing back reach for two names.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "Akasha makes no git worktree, and a tree pinned at a commit is a plain export.",
    },
  ],
} as const satisfies Domain
