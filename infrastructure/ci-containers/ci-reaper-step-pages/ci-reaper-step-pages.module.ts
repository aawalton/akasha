import type { Module } from "@akasha/code-system/module"

export const ciReaperStepPages = {
  id: "01a06861-24c9-7011-80b4-0b9114199dc4",
  pageTypeSlug: "module",
  slug: "ci-reaper-step-pages",
  definition: "the step and pipeline pages a reaper tick reads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type no page is filed under is read as no rows rather than refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value carried as a number or a truth is read as its text rather than as absent.",
    },
    {
      invariantKind: "departure",
      statement:
        "The step and pipeline pages are read off the checkout index rather than as files.",
    },
  ],
} as const satisfies Module
