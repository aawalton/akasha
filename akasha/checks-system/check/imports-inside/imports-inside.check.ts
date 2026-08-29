import type { Check } from "../check.page-type.ts"

export const importsInside = {
  id: "01a04bcb-dfe3-7bd6-afaf-9470bb845f82",
  pageTypeSlug: "check",
  slug: "imports-inside",
  definition: "the check refusing an akasha file that imports a file outside the akasha folder",
  code: "ts",
  test: "ts",
  runsOn: ["patch", "worktree", "deploy"],
  invariants: [
    {
      invariantKind: "absence",
      statement:
        "A specifier naming no path of its own is a package, and a package is not the akasha folder's business.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where a relative specifier lands is decided by the file holding it, never by where the check was run from.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier is judged where it is written.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier is judged by where it lands, never by what is there.",
    },
    {
      invariantKind: "departure",
      statement: "The boundary is drawn at the path separator.",
    },
    {
      invariantKind: "gap",
      statement: "A reader of akasha needs nothing outside akasha to follow what akasha says.",
    },
  ],
} as const satisfies Check
