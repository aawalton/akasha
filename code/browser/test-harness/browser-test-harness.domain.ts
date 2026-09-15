import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const browserTestHarness = {
  id: "01a05ca9-d801-7799-a4a3-de2a41d35502",
  type: "domain",
  slug: "browser-test-harness",
  definition: "a chromium driven against a running app, signed in as a user it never writes",
  parts: [
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
      invariantKind: "invariant-kind/departure",
      statement: "The browser this drives is an optional dependency.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows the assertion any test the harness has makes.",
    },
  ],
} as const satisfies Domain
