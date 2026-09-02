import type { CodeCheck } from "../../code-check.page-type.ts"

export const fileLength = {
  id: "01a04bcb-c6e7-7e01-9b01-3cad38df56be",
  pageTypeSlug: "code-check",
  slug: "file-length",
  definition: "the check refusing a file whose body is over the byte ceiling its kind is held to",
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
      statement: "An entry file is held to a wider byte ceiling than any other file.",
    },
    {
      invariantKind: "departure",
      statement: "An entry file carries the `jsonl` extension.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal for a test file names the `test-fixtures` file standing beside that test file.",
    },
  ],
} as const satisfies CodeCheck
