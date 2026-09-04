import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const oldGraph = {
  id: "01a06950-57ae-735f-b2d9-2adbff6dfbbc",
  pageTypeSlug: "workspace-package",
  slug: "old-graph",
  definition:
    "the graph once built over the whole repository, kept only while its callers move off",
  manifest: "json",
  partSlugs: [
    "module/old-graph-asking",
    "module/old-graph-gone",
    "module/old-graph-node-keys",
    "module/old-graph-producers",
    "module/old-graph-queries",
    "module/old-graph-snapshots",
    "module/old-graph-ts-files",
    "module/old-graph-types",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every call into the old graph throws rather than answering.",
    },
    {
      invariantKind: "departure",
      statement: "The old graph is built by nothing here and holds no data.",
    },
    {
      invariantKind: "departure",
      statement: "What each type says is kept so a caller owing the move still compiles.",
    },
    {
      invariantKind: "gap",
      statement: "A file importing this package is a file owing a move onto the graph system.",
    },
    {
      invariantKind: "gap",
      statement: "This package is deleted once nothing imports this package.",
    },
  ],
} as const satisfies WorkspacePackage
