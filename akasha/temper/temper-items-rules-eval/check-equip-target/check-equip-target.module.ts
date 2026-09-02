import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const checkEquipTarget = {
  id: "01a06137-f964-761e-935e-c18a08cf1dce",
  pageTypeSlug: "module",
  slug: "check-equip-target",
  definition:
    "the condition check over whether an item is equipment a character or companion wants",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A missing equipType or traitType or quality makes the condition indeterminate.",
    },
    {
      invariantKind: "departure",
      statement: "The first missing field of those three is reported as the missing signal.",
    },
    {
      invariantKind: "constraint",
      statement: "Character equipment and companion equipment are separate environment lookups.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reports which character wants the equipment.",
    },
  ],
} as const satisfies Module
