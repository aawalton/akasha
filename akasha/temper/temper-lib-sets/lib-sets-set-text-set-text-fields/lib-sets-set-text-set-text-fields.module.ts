import type { Module } from "@akasha/code-system/module"

export const libSetsSetTextSetTextFields = {
  id: "01a06231-8f1f-73ea-b8fc-4fb6e3b80305",
  pageTypeSlug: "module",
  slug: "lib-sets-set-text-set-text-fields",
  definition: "which pieces of a set's text are worth computing and the computing of them",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A piece is skipped when neither the settings nor the pattern asks for it.",
    },
    {
      invariantKind: "constraint",
      statement: "Drop text identical to the set type text is emptied out.",
    },
  ],
} as const satisfies Module
