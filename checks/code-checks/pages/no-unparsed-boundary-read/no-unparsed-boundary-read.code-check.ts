import type { CodeCheck } from "../../code-check.page-type.ts"

export const noUnparsedBoundaryRead = {
  id: "01a0827e-df53-7d03-80a4-b3305001f92e",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "no-unparsed-boundary-read",
  definition: "the check refusing a read across a boundary that no parse follows",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A read across a boundary is refused where no approved parse follows it in the same block.",
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
      statement: "A rule landing under `no-refused-syntax` judges every file at patch at once.",
    },
    {
      invariantKind: "departure",
      statement:
        "Folding this into `no-refused-syntax` takes every site repaired and this page taken away.",
    },
    {
      invariantKind: "stopgap",
      statement: "This check runs on no phase while the tree still has sites the rule names.",
    },
    {
      invariantKind: "gap",
      statement: "The check runs on a phase.",
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
  ],
} as const satisfies CodeCheck
