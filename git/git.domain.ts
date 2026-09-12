import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const git = {
  id: "01a05d7f-23fc-7000-b2b7-266f4611121a",
  type: "domain",
  slug: "git",
  definition: "git run in a repository, and what it said",
  parts: [
    "domain/oid",
    "module/git-running",
    "module/git-answering",
    "module/porcelain-status",
    "module/porcelain-status-reading",
    "module/push-repo",
    "module/tree-sha",
    "module/git-capping",
    "module/git-landing-lock",
    "module/git-pathspec",
    "module/git-push-handoff",
    "module/git-pushing",
    "module/served-tip",
    "module/git-store-sweeping",
    "module/git-dir",
    "module/committing",
    "module/commit-reading",
    "module/holding",
    "module/head-commit",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A repository is named to git by `-C` rather than by the folder a caller is in.",
    },
    {
      invariantKind: "departure",
      statement: "The folder a checkout's worktrees share is asked of git rather than spelled.",
    },
    {
      invariantKind: "departure",
      statement: "What is under that folder is no page.",
    },
    {
      invariantKind: "departure",
      statement: "What akasha left under that folder goes by a sweep rather than by a change.",
    },
    {
      invariantKind: "departure",
      statement: "A caller wanting a throw and a caller wanting nothing back reach for two names.",
    },
    {
      invariantKind: "stopgap",
      statement: "The git this repository has run for years sits outside akasha at `repo/git`.",
    },
    {
      invariantKind: "gap",
      statement: "The code `repo/git` holds beyond running a command belongs here.",
    },
  ],
} as const satisfies Domain
