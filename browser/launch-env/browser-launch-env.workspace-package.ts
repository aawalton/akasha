import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const browserLaunchEnv = {
  id: "01a05c48-deeb-7003-a5da-3a33a507b7c8",
  pageTypeSlug: "workspace-package",
  slug: "browser-launch-env",
  definition: "the environment a browser is started with",
  manifest: "json",
  partSlugs: ["module/launch-env"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here starts a browser.",
    },
  ],
} as const satisfies WorkspacePackage
