import type { Check } from "../check.page-type.ts"

export const importsInside = {
  id: "01a04bcb-dfe3-7bd6-afaf-9470bb845f82",
  pageTypeSlug: "check",
  slug: "imports-inside",
  definition: "the check refusing an akasha file that imports a file outside the akasha folder",
  code: "ts",
  test: "ts",
  needs: "file",
  runsOn: ["patch", "worktree", "deploy"],
  design: [
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
      statement:
        "A specifier is judged where it is written, so a file is judged by its own body alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A specifier is judged by where it lands, never by what is there, so the check asks after no file and reads the same on every machine.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder whose name begins with the akasha folder's name is outside it, so the boundary is drawn at the separator.",
    },
  ],
  intent: [
    {
      invariantKind: "gap",
      statement: "A reader of akasha needs nothing outside akasha to follow what akasha says.",
    },
  ],
} as const satisfies Check
