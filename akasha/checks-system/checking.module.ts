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
      statement: "The page names the export it runs.",
    },
    {
      invariantKind: "departure",
      statement:
        "The checks are found in the index, and finding them costs nothing the corpus grows.",
    },
    {
      invariantKind: "departure",
      statement:
        "A check is run once over the whole change it was given, and never over the corpus.",
    },
    {
      invariantKind: "departure",
      statement:
        "A check that threw refuses the change it could not judge, and the refusal names the check's own page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path the change takes away is handed to every check, and reads there as a path whose body is nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "Judging each standing body in turn is a helper a check reaches for, and a check judging a path the change takes away walks the change itself.",
    },
    {
      invariantKind: "departure",
      statement: "Audit is the same run over every page the index knows.",
    },
  ],
} as const satisfies Module
