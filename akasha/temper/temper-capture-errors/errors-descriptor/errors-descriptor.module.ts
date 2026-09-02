import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const errorsDescriptor = {
  id: "01a0608a-15b2-78e5-a967-45a0dec13df1",
  pageTypeSlug: "module",
  slug: "errors-descriptor",
  definition: "the name, version and defaults the error add-on hands the game to save under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The game saves the add-on under the name `TemperErrors_SavedVariables`.",
    },
    {
      invariantKind: "departure",
      statement: "The defaults carry an empty list of entries.",
    },
    {
      invariantKind: "absence",
      statement: "No load time is kept.",
    },
  ],
} as const satisfies Module
