import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noReExport = {
  id: "01a04eea-b718-7687-bb51-e4efaeaf429e",
  type: "page-type/check-code",
  slug: "no-re-export",
  definition: "the check refusing a file that exports a name it did not declare itself",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name imported and then exported is judged as a name exported straight from its source.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new spelling on the way out hides nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type-only re-export is a re-export.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`export *` is refused whole rather than name by name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A re-export inside another declaration is refused like a re-export at the top.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A barrel quietly undoes one way into a folder.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Only a name is followed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "An imported value bound to a fresh exported name is a declaration this file made.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 60 },
  createdAt: "2026-08-29T19:06:40.280Z",
  updatedAt: "2026-09-19T04:45:54.000Z",
} as const satisfies CheckCode
