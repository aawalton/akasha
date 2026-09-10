import type { Domain } from "../domains/domain.page-type.types.ts"

export const git = {
  id: "01a05d7f-23fc-7000-b2b7-266f4611121a",
  pageTypeSlug: "domain",
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
    "module/git-committing",
    "module/git-landing-lock",
    "module/git-pathspec",
    "module/git-push-handoff",
    "module/git-pushing",
    "module/served-tip",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A repository is named to git by `-C` rather than by the folder a caller is in.",
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
