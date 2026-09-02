import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionGearIds = {
  id: "01a060bf-747d-7dee-bf58-1559bc114b90",
  pageTypeSlug: "module",
  slug: "companion-gear-ids",
  definition: "the trait and the quality a piece of companion equipment is named by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every id here names one page under `temper-companions`.",
    },
    {
      invariantKind: "gap",
      statement: "`@akasha/temper-companions-core` holds a second table of these same ids.",
    },
  ],
} as const satisfies Module
