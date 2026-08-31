import type { Check } from "../check.page-type.ts"

export const indexAskedNotReached = {
  id: "01a05368-8e96-7f29-bf11-acd77e70bdeb",
  pageTypeSlug: "check",
  slug: "index-asked-not-reached",
  definition:
    "the check refusing a file outside the index folders that takes a path or a raw read of the index",
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
        "The names refused are the ones handing back a path into the index or a raw read of it.",
    },
    {
      invariantKind: "departure",
      statement: "They stay exported.",
    },
    {
      invariantKind: "departure",
      statement: "What is refused is taking the name rather than what is done with it.",
    },
    {
      invariantKind: "departure",
      statement: "A file under the indexes folder is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A file under the shadow folder is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "The shadow works out the index a change would leave.",
    },
    {
      invariantKind: "departure",
      statement: "A name is judged by what it was declared as rather than what it was taken as.",
    },
    {
      invariantKind: "absence",
      statement: "Where an import lands is read from the specifier alone.",
    },
    {
      invariantKind: "departure",
      statement: "This runs on no phase.",
    },
    {
      invariantKind: "departure",
      statement: "What it would refuse can be read against the tree before it binds anyone.",
    },
  ],
} as const satisfies Check
