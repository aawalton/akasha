import type { Check } from "../check.page-type.ts"

export const statementStatesOneThing = {
  id: "01a05407-306d-7b50-85c4-bf43575aa786",
  pageTypeSlug: "check",
  slug: "statement-states-one-thing",
  definition: "the check refusing a statement that says why or holds more than one thing",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A statement is found by parsing the file rather than by loading the page.",
    },
    {
      invariantKind: "departure",
      statement: "A consequence joined to a fact is refused as a reason is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A statement is refused for the words joining two facts rather than for holding two.",
    },
    {
      invariantKind: "gap",
      statement: "Every phase runs with no statement in the corpus refused.",
    },
  ],
} as const satisfies Check
