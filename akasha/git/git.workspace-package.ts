import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const git = {
  id: "01a05d7f-23fc-7000-b2b7-266f4611121a",
  pageTypeSlug: "workspace-package",
  slug: "git",
  definition: "git run in a repository, and what it said",
  manifest: "json",
  partSlugs: [
    "domain/oid",
    "module/git-running",
    "module/git-answering",
    "module/porcelain-status",
    "module/porcelain-status-reading",
    "module/tree-sha",
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
      statement: "What `repo/git` holds beyond running a command belongs here.",
    },
  ],
} as const satisfies WorkspacePackage
