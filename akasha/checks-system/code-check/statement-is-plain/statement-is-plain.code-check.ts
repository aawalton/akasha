import type { CodeCheck } from "../code-check.page-type.ts"

export const statementIsPlain = {
  id: "01a05407-306d-7b50-85c4-bf43575aa786",
  pageTypeSlug: "code-check",
  slug: "statement-is-plain",
  definition: "the check refusing an invariant that is not written in plain language",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
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
      statement: "A statement the grammar refuses is not plain.",
    },
    {
      invariantKind: "departure",
      statement: "The grammar is built from the sentence shapes the index names.",
    },
    {
      invariantKind: "departure",
      statement: "A statement already refused for a mark is not judged against the grammar too.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the shape the grammar read the statement in.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal naming no shape says the word the parse stopped at.",
    },
    {
      invariantKind: "stopgap",
      statement: "The phases judging the whole tree are off until every invariant is rewritten.",
    },
    {
      invariantKind: "gap",
      statement: "Every invariant under akasha is plain.",
    },
  ],
} as const satisfies CodeCheck
