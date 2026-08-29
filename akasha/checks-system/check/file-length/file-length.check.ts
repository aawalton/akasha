import type { Check } from "../check.page-type.ts"

export const fileLength = {
  id: "01a04bcb-c6e7-7e01-9b01-3cad38df56be",
  pageTypeSlug: "check",
  slug: "file-length",
  definition: "the check refusing a file whose body is over the byte ceiling",
  code: "ts",
  test: "ts",
  runsOn: ["patch", "worktree", "deploy"],
  design: [
    {
      invariantKind: "departure",
      statement: "The ceiling is counted in bytes, never in characters.",
    },
    {
      invariantKind: "departure",
      statement: "Every file in the akasha folder is judged, and no kind of file is exempt.",
    },
    {
      invariantKind: "departure",
      statement: "A file is judged by its own size alone.",
    },
  ],
} as const satisfies Check
