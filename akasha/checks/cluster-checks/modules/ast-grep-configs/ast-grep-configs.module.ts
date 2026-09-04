import type { Module } from "@akasha/code-system/module"

export const astGrepConfigs = {
  id: "01a069cc-a5de-7782-a90d-1466419d530a",
  pageTypeSlug: "module",
  slug: "ast-grep-configs",
  definition:
    "the ast-grep rule files and workspaces a repository declares, read off its sgconfigs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule directory is read relative to the sgconfig naming it.",
    },
    {
      invariantKind: "departure",
      statement: "A rule file that does not parse is answered as a gap rather than thrown over.",
    },
    {
      invariantKind: "departure",
      statement: "A gap in any rule file widens the watch plan to the whole repository.",
    },
    {
      invariantKind: "departure",
      statement: "A workspace whose manifest names nothing is left out.",
    },
  ],
} as const satisfies Module
