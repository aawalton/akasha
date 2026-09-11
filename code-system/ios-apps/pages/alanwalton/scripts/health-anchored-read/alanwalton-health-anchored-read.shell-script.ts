import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const alanwaltonHealthAnchoredRead = {
  id: "01a0595b-ef58-76f8-9419-7a315c06c969",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "alanwalton-health-anchored-read",
  definition:
    "the Swift running one anchored query page and returning its samples, anchor and error",
  shell: "sh",
  sourced: true,
  invariants: [
    {
      invariantKind: "constraint",
      statement: "HealthKit hides read authorization.",
    },
    {
      invariantKind: "constraint",
      statement: "An app cannot infer that a read was declined.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A refused read comes back empty with a valid anchor and no error as a quiet read does.",
    },
    {
      invariantKind: "departure",
      statement: "A read that errored hands back the error that ended it.",
    },
    {
      invariantKind: "constraint",
      statement: "HealthKit's store is shut while the phone is locked.",
    },
    {
      invariantKind: "departure",
      statement: "A shut store and a refused read are told apart by the error code alone.",
    },
  ],
} as const satisfies ShellScript
