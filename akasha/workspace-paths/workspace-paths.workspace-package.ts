import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const workspacePaths = {
  id: "01a05c48-deeb-700a-a48e-da9f2becaa1d",
  pageTypeSlug: "workspace-package",
  slug: "workspace-paths",
  definition:
    "which folders of a repository the package manager installs, read off the root manifest",
  manifest: "json",
  partSlugs: [
    "module/workspace-dirs",
    "module/workspace-bins",
    "module/workspace-bins-verifying",
    "module/stale-folders",
    "module/tsconfig-references",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The repository root is taken as an argument rather than worked out from here.",
    },
  ],
} as const satisfies WorkspacePackage
