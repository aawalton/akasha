import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const restatementNarrowsSomething = {
  id: "01a058ff-fbf9-76dc-8437-ad9a61e75657",
  type: "check-code",
  slug: "restatement-narrows-something",
  definition: "the check refusing a restatement of an inherited property that narrows nothing",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An inherited property is restated only to narrow that property.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A restatement moving no field in the narrowing direction is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Optional becoming required narrows.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count falling narrows.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A length falling narrows.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value moving out of the commit or out of the open narrows.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A unique kind moving toward `page-property` narrows.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A declaration is judged against the nearest declaration above that declaration.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which page types stand above a page type is walked through `extends-type`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page type is judged when the change has that page type or a property that type declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type under a judged page type is judged as well.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A restatement that loosens is passed over here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "`key-names-one-property` refuses every loosening.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "One restatement earns one refusal.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A record property inherits nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Its fields are not judged here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A page type saying one property twice over is not judged here.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
