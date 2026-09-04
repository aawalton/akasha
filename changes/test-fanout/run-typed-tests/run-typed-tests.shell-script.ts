import type { ShellScript } from "@akasha/code-system/shell-script"

export const runTypedTests = {
  id: "01a06869-9381-7000-968b-28104876d52c",
  pageTypeSlug: "shell-script",
  slug: "run-typed-tests",
  definition:
    "one test type fanned out over every workspace bearing it, then the crashes re-run alone",
  shell: "sh",
  sourced: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A test type outside unit, property and component is refused before anything runs.",
    },
    {
      invariantKind: "departure",
      statement: "Finding no test-bearing workspace is a refusal rather than a pass.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bearing roots are handed to every shard so each can prune the roots nested under it.",
    },
    {
      invariantKind: "departure",
      statement: "A failure in the concurrent phase ends the run without the isolated re-run.",
    },
    {
      invariantKind: "departure",
      statement: "A shard that crashed under batch load is run again alone and one at a time.",
    },
    {
      invariantKind: "departure",
      statement:
        "A crash that does not happen again alone is absorbed rather than failing the run.",
    },
    {
      invariantKind: "departure",
      statement: "How many test files were asserted is said whether the run passed or failed.",
    },
    {
      invariantKind: "departure",
      statement: "The checkout the helpers stand in is found by walking up to the lockfile.",
    },
  ],
} as const satisfies ShellScript
