import type { Check } from "../check.page-type.ts"

export const fileLength = {
  id: "01a04bcb-c6e7-7e01-9b01-3cad38df56be",
  pageTypeSlug: "check",
  slug: "file-length",
  definition: "the check refusing a file whose body is over the byte ceiling",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The ceiling is counted in bytes rather than in characters.",
    },
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
      statement: "A file is judged by its own size alone.",
    },
  ],
} as const satisfies Check
