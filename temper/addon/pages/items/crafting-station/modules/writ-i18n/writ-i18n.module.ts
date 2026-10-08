import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const writI18n = {
  id: "01a061c7-e896-7e6c-9bf8-02b9e70effd6",
  type: "page-type/module",
  slug: "writ-i18n",
  definition: "turns an id into the name the player's client shows",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key no table and no lookup answers is shown as itself.",
    },
  ],
  createdAt: "2026-09-02T11:01:26.294Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
