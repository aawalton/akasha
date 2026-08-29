import type { Check } from "../check.page-type.ts"

export const noRawNulBytes = {
  id: "01a04bc8-6c71-7973-85d5-6d17ea5fea65",
  pageTypeSlug: "check",
  slug: "no-raw-nul-bytes",
  definition: "the check refusing a file carrying a raw NUL byte",
  code: "ts",
  test: "ts",
  needs: "file",
  runsOn: ["patch", "worktree", "deploy"],
  design: [
    {
      invariantKind: "departure",
      statement: "Every file in the akasha folder is judged, and no kind of file is exempt.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file carrying more than one NUL is reported at the first, with how many stand in it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A NUL is counted in the bytes, so a body that is not text is judged the same as one that is.",
    },
  ],
} as const satisfies Check
