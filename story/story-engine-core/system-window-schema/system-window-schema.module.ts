import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const systemWindowSchema = {
  id: "01a05b71-e544-78bb-9313-d10464beea25",
  pageTypeSlug: "module",
  slug: "system-window-schema",
  definition: "the typed cards the System voice puts on screen",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A window stored as a quest offer reads back as a quest added.",
    },
  ],
} as const satisfies Module
