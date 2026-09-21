import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const browserTestHarness = {
  id: "01a05ca9-d801-7799-a4a3-de2a41d35502",
  type: "page-type/domain",
  slug: "browser-test-harness",
  definition: "a chromium driven against a running app, signed in as a user it never writes",
  parts: [
    "module/console-capture",
    "module/deployed-render-check",
    "module/harness-launch",
    "module/prewarm",
    "module/read-only-harness",
    "module/target-guard",
    "module/worktree-git-facts",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The browser this drives is an optional dependency.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows the assertion any test the harness has makes.",
    },
  ],
} as const satisfies Domain
