import type { ShellScript } from "@akasha/code/shell-script"

export const alanwaltonHealthIntentPerform = {
  id: "01a0595b-ef59-7b52-84e4-2da173759a5e",
  pageTypeSlug: "shell-script",
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
      statement: "A share set holding anything asks to write Alan's own health data.",
    },
  ],
} as const satisfies ShellScript
