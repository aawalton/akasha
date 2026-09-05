import type { CodeCheck } from "../../code-check.page-type.ts"

export const fileLength = {
  id: "01a04bcb-c6e7-7e01-9b01-3cad38df56be",
  pageTypeSlug: "code-check",
  slug: "file-length",
  definition: "the check refusing a file whose body is over the byte ceiling its kind is held to",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
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
    {
      invariantKind: "departure",
      statement: "A property saying its files are not judged for length lets those files off.",
    },
    {
      invariantKind: "departure",
      statement: "A property naming its file is read from the file's own name.",
    },
    {
      invariantKind: "departure",
      statement: "That file is let off only where a page carrying the property sits in its folder.",
    },
    {
      invariantKind: "departure",
      statement: "A file of that name in another folder is held to the ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "A property naming no file is read from the section its files carry.",
    },
    {
      invariantKind: "departure",
      statement: "Every file that section names is let off wherever that file sits.",
    },
    {
      invariantKind: "departure",
      statement: "Which files a machine writes is a question of its own, asked elsewhere.",
    },
  ],
} as const satisfies CodeCheck
