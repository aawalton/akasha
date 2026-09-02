import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionBuildEdits = {
  id: "01a06152-c2c4-7605-8f02-6a19f8f10543",
  pageTypeSlug: "module",
  slug: "companion-build-edits",
  definition: "the changes one makes to a companion build",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change returns a new build rather than altering the one handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A build change sits apart from the tables the change reads.",
    },
    {
      invariantKind: "constraint",
      statement: "Setting a companion's base roles also sets every armour slot's weight.",
    },
    {
      invariantKind: "constraint",
      statement: "Setting a companion also sets that companion's usual ultimate.",
    },
  ],
} as const satisfies Module
