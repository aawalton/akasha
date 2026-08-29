import type { Module } from "../code-system/module/module.page-type.ts"

export const checking = {
  id: "01a04bc4-7e86-7df4-a322-36cc3b789fce",
  pageTypeSlug: "module",
  slug: "checking",
  definition: "every check gathered and run over one change, answering what refuses it",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: [],
  design: [
    {
      invariantKind: "departure",
      statement: "A check and its page cannot drift apart, because the page names the export.",
    },
    {
      invariantKind: "departure",
      statement:
        "The checks are found in the index, so finding them costs nothing the corpus grows.",
    },
    {
      invariantKind: "departure",
      statement:
        "A check is run once for each changed file it was given, and never once for the corpus.",
    },
    {
      invariantKind: "departure",
      statement: "A check that threw refuses the change it could not judge.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path the change takes away is handed to every check needing only the path, and passed over only by the checks needing bytes it has none of.",
    },
    {
      invariantKind: "departure",
      statement:
        "What was judged is counted from the same handing that runs the checks, so a caller is never told a number larger than the checks saw.",
    },
    {
      invariantKind: "departure",
      statement:
        "Audit is the same run over every page the index knows, so no phase walks the tree.",
    },
  ],
} as const satisfies Module
