import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const alanwaltonHealthSamplesDrain = {
  id: "01a0595b-ef5a-7652-8db5-ad456ba7251d",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "alanwalton-health-samples-drain",
  definition: "the parts of the health-samples drain, sourced in order",
  shell: "sh",
  sourced: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The part closing the intent's braces is sourced before any part written beside it.",
    },
  ],
} as const satisfies ShellScript
