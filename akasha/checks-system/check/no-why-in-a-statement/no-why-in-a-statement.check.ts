import type { Check } from "../check.page-type.ts"

export const noWhyInAStatement = {
  id: "01a05407-306d-7b50-85c4-bf43575aa786",
  pageTypeSlug: "check",
  slug: "no-why-in-a-statement",
  definition: "the check refusing a statement that says why, or holds more than one fact",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A statement is found by parsing the file, never by loading the page.",
    },
    {
      invariantKind: "departure",
      statement: "A consequence joined to a fact is refused as a reason is.",
    },
    {
      invariantKind: "departure",
      statement: "A semicolon joins two facts and is refused as a consequence is.",
    },
    {
      invariantKind: "gap",
      statement: "Every phase runs, and no statement in the corpus is refused.",
    },
  ],
} as const satisfies Check
