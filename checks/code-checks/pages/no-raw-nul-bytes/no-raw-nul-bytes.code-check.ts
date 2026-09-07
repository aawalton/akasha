import type { CodeCheck } from "../../code-check.page-type.ts"

export const noRawNulBytes = {
  id: "01a04bc8-6c71-7973-85d5-6d17ea5fea65",
  pageTypeSlug: "code-check",
  slug: "no-raw-nul-bytes",
  definition: "the check refusing a file carrying a raw NUL byte",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every file no property declares as bytes is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A body a file property declares as bytes is let through.",
    },
    {
      invariantKind: "departure",
      statement: "A file carrying more than one NUL is reported at the first.",
    },
    {
      invariantKind: "departure",
      statement: "The report says how many NULs the file carries.",
    },
    {
      invariantKind: "departure",
      statement: "A NUL is counted in the bytes rather than in the decoded text.",
    },
  ],
} as const satisfies CodeCheck
