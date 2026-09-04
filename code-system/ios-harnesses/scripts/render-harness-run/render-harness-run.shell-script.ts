import type { ShellScript } from "../../../shell-scripts/shell-script.page-type.ts"

export const renderHarnessRun = {
  id: "01a059a0-c8c3-7532-ba93-10d6107fa669",
  pageTypeSlug: "shell-script",
  slug: "render-harness-run",
  definition: "what draws an app's tiles on a simulator",
  shell: "sh",
  sourced: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A workstation that is not a mac hands the run to one that is.",
    },
    {
      invariantKind: "departure",
      statement: "The mac leg compiles what was sent to the mac leg rather than reading akasha.",
    },
  ],
} as const satisfies ShellScript
