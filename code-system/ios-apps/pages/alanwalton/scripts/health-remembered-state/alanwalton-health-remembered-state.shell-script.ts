import type { ShellScript } from "@akasha/code/shell-script"

export const alanwaltonHealthRememberedState = {
  id: "01a0595b-ef59-7e5d-8977-51de45794d4a",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "alanwalton-health-remembered-state",
  definition: "the Swift reading and writing a metric's anchor",
  shell: "sh",
  sourced: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The anchor is written from one place alone, the success arm of the upload.",
    },
    {
      invariantKind: "departure",
      statement:
        "A write anywhere else advances the cursor past samples the server never acknowledged.",
    },
    {
      invariantKind: "departure",
      statement: "The seed window is computed on each run and persisted nowhere.",
    },
    {
      invariantKind: "departure",
      statement:
        "A floor stored once is a permanent lower bound nothing on the device can read back.",
    },
  ],
} as const satisfies ShellScript
