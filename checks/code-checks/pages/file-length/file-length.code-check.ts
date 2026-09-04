import type { CodeCheck } from "../../code-check.page-type.ts"

export const fileLength = {
  id: "01a04bcb-c6e7-7e01-9b01-3cad38df56be",
  pageTypeSlug: "code-check",
  slug: "file-length",
  definition: "the check refusing a file whose body is over the byte ceiling its kind is held to",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
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
      statement: "An entry file is held to the widest byte ceiling of any file.",
    },
    {
      invariantKind: "departure",
      statement: "An entry file carries the `jsonl` or the `json` extension.",
    },
    {
      invariantKind: "departure",
      statement: "A markup file is held to a byte ceiling wider than a code file's ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "A markup file carries the `xml` extension.",
    },
    {
      invariantKind: "constraint",
      statement: "The game rather than akasha decides where a markup file may be divided.",
    },
    {
      invariantKind: "departure",
      statement: "A prose file is held to a byte ceiling wider than a code file's ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "A prose file carries the `md` or the `txt` extension.",
    },
    {
      invariantKind: "constraint",
      statement: "The author rather than akasha decides where prose may be divided.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal for a prose file names what dividing prose costs a reader.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal for a markup file names the division an addon's manifest admits.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal for a test file names the `test-fixtures` file standing beside that test file.",
    },
  ],
} as const satisfies CodeCheck
