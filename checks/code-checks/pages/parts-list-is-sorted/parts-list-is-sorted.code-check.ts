import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const partsListIsSorted = {
  id: "01a09558-e9b5-7e59-a4ac-0ca6ead600aa",
  type: "code-check",
  slug: "parts-list-is-sorted",
  definition: "the check refusing a page naming its parts out of order",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnWorktree: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A parts list is sorted by the whole `type/slug` a part is written as.",
    },
    {
      invariantKind: "departure",
      statement: "A slug is read under the page type written with it rather than on its own.",
    },
    {
      invariantKind: "departure",
      statement: "Two parts spelled alike are in order either way round.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the first pair out of order rather than every pair.",
    },
    {
      invariantKind: "departure",
      statement: "Every page the change carries is judged rather than a page of one type.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming no part is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A page the change takes away is passed over.",
    },
    {
      invariantKind: "absence",
      statement: "A page whose body will not load is passed over.",
    },
    {
      invariantKind: "absence",
      statement: "`page-matches-its-type` refuses a body that will not load.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is judged while this page states `experimental`.",
    },
    {
      invariantKind: "departure",
      statement: "`experimental` comes off this page where Alan has approved this check.",
    },
    {
      invariantKind: "upkeep",
      statement: "The pages naming their parts out of order are sorted before this check binds.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
  experimental: true,
} as const satisfies CodeCheck
