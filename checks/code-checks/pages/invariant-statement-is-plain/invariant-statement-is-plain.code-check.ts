import type { CodeCheck } from "../../code-check.page-type.ts"

export const invariantStatementIsPlain = {
  id: "01a05407-306d-7b50-85c4-bf43575aa786",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "invariant-statement-is-plain",
  definition: "the check refusing an invariant that is not written in plain language",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A statement is read from the file the parser read rather than from the page a loader built.",
    },
    {
      invariantKind: "departure",
      statement: "An invariant is judged here and nothing else a page says.",
    },
    {
      invariantKind: "departure",
      statement: "A consequence joined to a fact is refused as a reason is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A statement is refused for the words joining two facts rather than for the two facts.",
    },
    {
      invariantKind: "departure",
      statement: "A mark inside a spelt name is no mark of the statement's own.",
    },
    {
      invariantKind: "departure",
      statement: "A word inside a spelt name is no word of the statement's own.",
    },
    {
      invariantKind: "departure",
      statement: "A statement written in a shape akasha refuses is not plain.",
    },
    {
      invariantKind: "departure",
      statement: "A statement is judged against every refused shape the index names.",
    },
    {
      invariantKind: "departure",
      statement: "A statement already refused for a mark is not judged against the shapes too.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the shape that matched.",
    },
    {
      invariantKind: "departure",
      statement: "A statement no refused shape matches is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A sentence no shape reaches is a gap in the shapes rather than a fault in the statement.",
    },
    {
      invariantKind: "departure",
      statement: "Every invariant under akasha is plain.",
    },
    {
      invariantKind: "stopgap",
      statement: "This check runs on no phase while Alan settles how a statement is judged.",
    },
  ],
} as const satisfies CodeCheck
