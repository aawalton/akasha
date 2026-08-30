import type { Check } from "../check.page-type.ts"

export const noRawNulBytes = {
  id: "01a04bc8-6c71-7973-85d5-6d17ea5fea65",
  pageTypeSlug: "check",
  slug: "no-raw-nul-bytes",
  definition: "the check refusing a file carrying a raw NUL byte",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every file in the akasha folder is judged.",
    },
    {
      invariantKind: "departure",
      statement: "No kind of file is exempt.",
    },
    {
      invariantKind: "departure",
      statement: "A file carrying more than one NUL is reported at the first.",
    },
    {
      invariantKind: "departure",
      statement: "The report says how many stand in it.",
    },
    {
      invariantKind: "departure",
      statement: "A NUL is counted in the bytes rather than in the decoded text.",
    },
  ],
} as const satisfies Check
