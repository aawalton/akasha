import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const renderHarnessRun = {
  id: "01a059a0-c8c3-7532-ba93-10d6107fa669",
  type: "page-type/shell-script",
  slug: "render-harness-run",
  definition: "what draws an app's tiles on a simulator",
  shell: "sh",
  sourced: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A workstation that is not a mac hands the run to a workstation that is a mac.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mac leg compiles the Swift sent to the mac leg rather than reading akasha.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every temp directory a leg makes is taken away when that leg ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A removal is registered where the directory it takes away is made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A removal that refuses leaves the removals after it to run.",
    },
  ],
} as const satisfies ShellScript
