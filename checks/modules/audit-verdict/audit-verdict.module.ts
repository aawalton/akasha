import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const auditVerdict = {
  id: "01a091e9-689c-7000-a6ba-611889107d33",
  type: "module",
  slug: "audit-verdict",
  definition: "what a check's last audit found, and the commits that finding answers for",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A verdict is one check's rather than one audit run's.",
    },
    {
      invariantKind: "departure",
      statement: "A check has one verdict, and it is the last verdict taken.",
    },
    {
      invariantKind: "departure",
      statement: "A verdict states the newest commit its finding still answers for.",
    },
    {
      invariantKind: "departure",
      statement: "A verdict states the moment the check ran.",
    },
    {
      invariantKind: "departure",
      statement: "A verdict is clean where the check ran and refused nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A clean verdict answers for the commit it states and every ancestor of that commit.",
    },
    {
      invariantKind: "departure",
      statement: "Whether one commit is an ancestor of another is asked of git.",
    },
    {
      invariantKind: "departure",
      statement: "A verdict is kept outside the repository whose audits take it.",
    },
    {
      invariantKind: "departure",
      statement: "The verdicts are kept beside the units as the outages are.",
    },
    {
      invariantKind: "departure",
      statement: "A file that will not parse is read as holding no verdict rather than throwing.",
    },
    {
      invariantKind: "departure",
      statement: "An entry naming no commit is dropped rather than carried.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs an audit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which checks are owed a verdict.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here holds the file against a second writer.",
    },
  ],
} as const satisfies Module
