import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const alanwaltonHealthIntentPerform = {
  id: "01a0595b-ef59-7b52-84e4-2da173759a5e",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "alanwalton-health-intent-perform",
  definition: "the Swift performing the health-samples intent",
  shell: "sh",
  sourced: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The health store is asked for read access alone, the share set being empty.",
    },
    {
      invariantKind: "departure",
      statement: "A share set with anything asks to write Alan's own health data.",
    },
    {
      invariantKind: "departure",
      statement: "The state reset runs unconditionally before the first query of the run.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reset reached only under a condition leaves the run querying the cursor it drops.",
    },
  ],
} as const satisfies ShellScript
