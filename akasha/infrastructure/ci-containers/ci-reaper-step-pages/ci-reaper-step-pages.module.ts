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
      statement: "A page type whose pages are not files is unread rather than empty.",
    },
  ],
} as const satisfies Module
