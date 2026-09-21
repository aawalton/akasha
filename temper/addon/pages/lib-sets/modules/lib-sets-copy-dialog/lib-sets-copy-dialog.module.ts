import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsCopyDialog = {
  id: "01a0623c-2df8-7c0d-ae66-7d2de026a998",
  type: "page-type/module",
  slug: "lib-sets-copy-dialog",
  definition: "the dialog holding set text in an edit box a player can select and copy",
  code: "ts",
  decisions: [
    { decisionKind: "decision-kind/constraint", statement: "The published name is fixed." },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text over 20000 characters is broken into pages the player turns by hand.",
    },
    { decisionKind: "decision-kind/constraint", statement: "Nothing is built here on console." },
  ],
} as const satisfies Module
