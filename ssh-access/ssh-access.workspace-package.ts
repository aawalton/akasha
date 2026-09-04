import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const sshAccess = {
  id: "01a05c2f-0f02-7fb7-aaea-fff4b50ef0c6",
  pageTypeSlug: "workspace-package",
  slug: "ssh-access",
  definition: "how a script is run on another machine over ssh and its output read back",
  manifest: "json",
  partSlugs: ["module/ssh-target", "module/ssh-reach"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every machine reached from here is reached the one way.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what any script this package carries is for.",
    },
  ],
} as const satisfies WorkspacePackage
