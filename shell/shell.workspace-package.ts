import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const shell = {
  id: "01a05d9b-277a-7000-be3d-95c4cf94638d",
  pageTypeSlug: "workspace-package",
  slug: "shell",
  definition: "text a POSIX shell reads as a command",
  manifest: "json",
  partSlugs: ["module/quoting"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "The native shell an iOS app is built into is not this package.",
    },
    {
      invariantKind: "departure",
      statement: "A value written into a command is written so the shell reads it as one word.",
    },
  ],
} as const satisfies WorkspacePackage
