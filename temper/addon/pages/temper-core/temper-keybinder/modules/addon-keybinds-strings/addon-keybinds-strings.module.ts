import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonKeybindsStrings = {
  id: "01a0605a-051b-7d43-abd2-39b4b9801409",
  type: "page-type/module",
  slug: "addon-keybinds-strings",
  definition: "the two names under which the split halves of the keybindings menu are shown",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The names are English and are not translated.",
    },
  ],
  createdAt: "2026-09-02T04:21:47.419Z",
  updatedAt: "2026-09-22T14:13:12.000Z",
} as const satisfies Module
