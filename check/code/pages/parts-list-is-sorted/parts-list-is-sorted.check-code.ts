import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const partsListIsSorted = {
  id: "01a09558-e9b5-7e59-a4ac-0ca6ead600aa",
  type: "check-code",
  slug: "parts-list-is-sorted",
  definition: "the check refusing a page naming its parts out of order",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A parts list is sorted by the whole `type/slug` a part is written as.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug is read under the page type written with it rather than on its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two parts spelled alike are in order either way round.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names the first pair out of order rather than every pair.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page the change carries is judged rather than a page of one type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page naming no part is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page the change takes away is passed over.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A page whose body will not load is passed over.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "`page-matches-its-type` refuses a body that will not load.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing is judged while this page states `experimental`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`experimental` comes off this page where Alan has approved this check.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A part is put into a parts list in the order that list is sorted by.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`parts` says it is sorted, and `add-property-value` reads that off the shape.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
  experimental: true,
} as const satisfies CheckCode
