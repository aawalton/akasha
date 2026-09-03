import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const browserCommands = {
  id: "01a06862-06c8-7000-8f27-5543118e4614",
  pageTypeSlug: "workspace-package",
  slug: "browser-commands",
  definition: "what an agent runs by name over a site it drives a browser against",
  manifest: "json",
  partSlugs: [
    "command/browser-test-storage-state",
    "command/browser-test-verify-render",
    "module/browser-command-arguing",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command here is named for the path the old ops command was reached by.",
    },
    {
      invariantKind: "departure",
      statement: "A command here drives the harness rather than launching a browser of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The user a command here signs in as is checked against the protected one.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what any page it looks at is for.",
    },
  ],
} as const satisfies WorkspacePackage
