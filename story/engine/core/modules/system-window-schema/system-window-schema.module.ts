import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const systemWindowSchema = {
  id: "01a05b71-e544-78bb-9313-d10464beea25",
  type: "page-type/module",
  slug: "system-window-schema",
  definition: "the typed cards the System voice puts on screen",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A window stored as a quest offer reads back as a quest added.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill's window may name the title of the skill's ability kind.",
    },
  ],
  createdAt: "2026-09-01T05:29:46.052Z",
  updatedAt: "2026-10-28T00:50:14.517Z",
} as const satisfies Module
