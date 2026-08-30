import type { Check } from "../check.page-type.ts"

export const noReExport = {
  id: "01a04eea-b718-7687-bb51-e4efaeaf429e",
  pageTypeSlug: "check",
  slug: "no-re-export",
  definition: "the check refusing a file that exports a name it did not declare itself",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A name imported and then exported is judged the same as one exported straight from its source.",
    },
    {
      invariantKind: "departure",
      statement: "A new spelling on the way out hides nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A type-only re-export is a re-export.",
    },
    {
      invariantKind: "departure",
      statement: "`export *` is refused whole rather than name by name.",
    },
    {
      invariantKind: "departure",
      statement: "A barrel is what quietly undoes one way into a folder.",
    },
    {
      invariantKind: "absence",
      statement: "Only a name is followed.",
    },
    {
      invariantKind: "absence",
      statement:
        "An imported value bound to a fresh exported name is a declaration this file made.",
    },
    {
      invariantKind: "absence",
      statement: "A file outside the akasha folder is passed over rather than refused.",
    },
  ],
} as const satisfies Check
