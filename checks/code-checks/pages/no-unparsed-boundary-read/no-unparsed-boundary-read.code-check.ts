import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const noUnparsedBoundaryRead = {
  id: "01a0827e-df53-7d03-80a4-b3305001f92e",
  type: "code-check",
  slug: "no-unparsed-boundary-read",
  definition: "the check refusing a read across a boundary that no parse follows",
  runsOnChange: false,
  runsOnDeploy: false,
  runsOnWorktree: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A read across a boundary is refused where no approved parse follows that read in the same block.",
    },
    {
      invariantKind: "departure",
      statement: "The block is the nearest block or source file or clause with the read.",
    },
    {
      invariantKind: "departure",
      statement: "`JSON.parse` is a read across a boundary rather than a parse.",
    },
    {
      invariantKind: "departure",
      statement: "A call to an identifier spelled `parseSomething` is an approved parse.",
    },
    {
      invariantKind: "departure",
      statement: "A write to `process.env` is no read.",
    },
    {
      invariantKind: "departure",
      statement: "A file named `.d.ts` is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A file named `.generated.ts` or `.generated.tsx` is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A path with a `__fixtures__` or a `generated` segment is passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "This rule is a check of its own rather than a sixteenth rule under `no-refused-syntax`.",
    },
    {
      invariantKind: "constraint",
      statement: "A syntax rule has no phase of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A rule landing under `no-refused-syntax` judges every file at change at once.",
    },
    {
      invariantKind: "departure",
      statement:
        "Folding this check into `no-refused-syntax` takes every site repaired and this page taken away.",
    },
    {
      invariantKind: "gap",
      statement: "Every site the rule names is repaired.",
    },
    {
      invariantKind: "gap",
      statement: "A parse outside the block the read sits in is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "A read followed through a second variable is not seen.",
    },
    { invariantKind: "departure", statement: "A call to `firstCapture` is an approved parse." },
    {
      invariantKind: "departure",
      statement: "A body read from a `fetch` answer is a read across a boundary.",
    },
    {
      invariantKind: "departure",
      statement: "A file read through `Bun.file` is a read across a boundary.",
    },
    {
      invariantKind: "departure",
      statement: "A file read through `fs` is a read across a boundary.",
    },
    {
      invariantKind: "departure",
      statement: "The standard output of a spawned process is a read across a boundary.",
    },
    {
      invariantKind: "departure",
      statement: "An answer from a named remote procedure is a read across a boundary.",
    },
    {
      invariantKind: "departure",
      statement: "A capture a regular expression took is a read across a boundary.",
    },
    {
      invariantKind: "departure",
      statement: "A call to `requireMatch` or `requireMatchPositional` is an approved parse.",
    },
    {
      invariantKind: "departure",
      statement: "A call to `requireEnv` or `requireGet` or `requireFirst` is an approved parse.",
    },
    { invariantKind: "departure", statement: "A file named `.test-fixtures.ts` is passed over." },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
  experimental: true,
} as const satisfies CodeCheck
