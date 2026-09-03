import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const browserTestHarness = {
  id: "01a05ca9-d801-7799-a4a3-de2a41d35502",
  pageTypeSlug: "workspace-package",
  slug: "browser-test-harness",
  definition: "a chromium driven against a running app, signed in as a user it never writes",
  manifest: "json",
  partSlugs: [
    "module/browser-test-env",
    "module/console-capture",
    "module/deployed-render-check",
    "module/harness-launch",
    "module/prewarm",
    "module/read-only-harness",
    "module/storage-state-reading",
    "module/target-guard",
    "module/worktree-git-facts",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The browser this drives is an optional dependency.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what any test the harness carries is asserting.",
    },
  ],
} as const satisfies WorkspacePackage
