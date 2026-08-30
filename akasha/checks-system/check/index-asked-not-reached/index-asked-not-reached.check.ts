import type { Check } from "../check.page-type.ts"

export const indexAskedNotReached = {
  id: "01a05368-8e96-7f29-bf11-acd77e70bdeb",
  pageTypeSlug: "check",
  slug: "index-asked-not-reached",
  definition:
    "the check refusing a file outside the indexes folder that takes a path or a raw read of the index",
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
        "The names refused are the ones handing back a path into the index or a raw read of it, and they stay exported because the folder's own modules reach them across files.",
    },
    {
      invariantKind: "departure",
      statement:
        "What is refused is taking the name, never what is done with it, because a path is followed where no source can be read to see it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file under the indexes folder is passed over, because those names are what its own modules are built from.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name is judged by what it was declared as rather than what it was taken as, so bringing one in under another name is refused the same.",
    },
    {
      invariantKind: "absence",
      statement:
        "Where an import lands is read from the specifier alone, so a name of the same spelling taken from anywhere else stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "This runs on no phase. It states its rule and judges nothing, so what it would refuse can be read against the tree before it binds anyone.",
    },
    {
      invariantKind: "gap",
      statement:
        "The indexes folder answers every question its callers ask, nothing outside it takes a path into the index, and the phases are turned on.",
    },
  ],
} as const satisfies Check
