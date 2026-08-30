import type { Module } from "../../code-system/module/module.page-type.ts"

export const checking = {
  id: "01a04bc4-7e86-7df4-a322-36cc3b789fce",
  pageTypeSlug: "module",
  slug: "checking",
  definition: "every check gathered and run over one change, answering what refuses it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A check's page names the export it runs.",
    },
    {
      invariantKind: "departure",
      statement: "The checks are found in the index.",
    },
    {
      invariantKind: "departure",
      statement: "Finding them costs nothing the corpus grows.",
    },
    {
      invariantKind: "departure",
      statement: "A missing index refuses rather than reading as an index naming nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An index naming no check refuses the change it would leave unjudged.",
    },
    {
      invariantKind: "departure",
      statement:
        "A check is run once over the whole change it was given rather than over the corpus.",
    },
    {
      invariantKind: "departure",
      statement: "One shadow is cast over the change here and handed to every check.",
    },
    {
      invariantKind: "departure",
      statement: "A shadow that could not be worked out refuses the change before any check runs.",
    },
    {
      invariantKind: "departure",
      statement: "A check that threw refuses the change it could not judge.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the check's own page.",
    },
    {
      invariantKind: "departure",
      statement: "A path the change takes away is handed to every check.",
    },
    {
      invariantKind: "departure",
      statement: "A path the change takes away reads there as a path whose body is nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Judging each standing body in turn is a helper a check reaches for.",
    },
    {
      invariantKind: "departure",
      statement: "A check judging a path the change takes away walks the change itself.",
    },
    {
      invariantKind: "departure",
      statement:
        "Audit is the same run over every path the index files including page and property files alike.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every path is taken from the index rather than worked out here from the property names a file is held under.",
    },
    {
      invariantKind: "departure",
      statement: "A path is read out of the change by name as well as in turn.",
    },
    {
      invariantKind: "departure",
      statement:
        "A check needing what it was not handed reads the body the change would leave rather than the one on disk.",
    },
    {
      invariantKind: "departure",
      statement:
        "How a check runs over each file and how a text is read out of a body are held here rather than written again in every check.",
    },
  ],
} as const satisfies Module
