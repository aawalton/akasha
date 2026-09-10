import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const alanwaltonHealthAnchoredRead = {
  id: "01a0595b-ef58-76f8-9419-7a315c06c969",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "alanwalton-health-anchored-read",
  definition: "the Swift running one anchored query page and returning its samples and anchor",
  shell: "sh",
  sourced: true,
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "HealthKit hides read authorization, so an app cannot infer that a read was declined.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A refused read comes back empty with a valid anchor and no error, as a quiet read does.",
    },
  ],
} as const satisfies ShellScript
