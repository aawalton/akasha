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
        "A name imported and then exported is judged the same as one exported straight from its source. A new spelling on the way out hides nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A type-only re-export is a re-export: who owns a rule is read off what a module exports and a type barrel splits that as a value barrel does.",
    },
    {
      invariantKind: "departure",
      statement:
        "`export *` is refused whole rather than name by name: what it sends on is the other file's to change and this file cannot say what it is.",
    },
    {
      invariantKind: "departure",
      statement: "A barrel is what quietly undoes one way into a folder.",
    },
    {
      invariantKind: "absence",
      statement:
        "Only a name is followed. An imported value bound to a fresh exported name is a declaration this file made. It passes.",
    },
    {
      invariantKind: "absence",
      statement: "A file outside the akasha folder is passed over rather than refused.",
    },
  ],
} as const satisfies Check
