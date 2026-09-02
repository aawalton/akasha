import type { Module } from "@akasha/code-system/module"

export const errorsCollect = {
  id: "01a060cd-5650-7b6e-ab6c-41d8a589a7ce",
  pageTypeSlug: "module",
  slug: "errors-collect",
  definition: "every error entry gathered out of what each account saved",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every account in the saved file is gathered from.",
    },
    {
      invariantKind: "departure",
      statement: "An account saving no entries adds nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The entries keep the order the accounts were saved in.",
    },
    {
      invariantKind: "absence",
      statement: "No entry is weighed here.",
    },
  ],
} as const satisfies Module
