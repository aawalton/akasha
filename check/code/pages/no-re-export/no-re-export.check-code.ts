import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noReExport = {
  id: "01a04eea-b718-7687-bb51-e4efaeaf429e",
  type: "check-code",
  slug: "no-re-export",
  definition: "the check refusing a file that exports a name it did not declare itself",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A name imported and then exported is judged as a name exported straight from its source.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A new spelling on the way out hides nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A type-only re-export is a re-export.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`export *` is refused whole rather than name by name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A re-export inside another declaration is refused like a re-export at the top.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A barrel quietly undoes one way into a folder.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Only a name is followed.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "An imported value bound to a fresh exported name is a declaration this file made.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
