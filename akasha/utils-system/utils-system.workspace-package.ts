import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const utilsSystem = {
  id: "01a05c67-00ac-7c6f-a5c8-9391ef1427fe",
  pageTypeSlug: "workspace-package",
  slug: "utils-system",
  definition: "what the Linux kernel says about the workstation, read from the files it says it in",
  manifest: "json",
  partSlugs: ["module/memory-guard", "module/inode-guard", "module/worktree-paths"],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Everything here reads a file only Linux has.",
    },
  ],
} as const satisfies WorkspacePackage
