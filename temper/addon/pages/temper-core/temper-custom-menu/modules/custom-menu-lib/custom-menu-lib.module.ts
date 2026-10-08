import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const customMenuLib = {
  id: "01a0605a-581e-7826-9cc9-769dd4862bdf",
  type: "page-type/module",
  slug: "custom-menu-lib",
  definition: "the library object every caller of the custom menu reaches",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A registered category outside the early to late range is clamped into that range.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A special key context menu is registered under its own key rather than a category.",
    },
  ],
  createdAt: "2026-09-02T04:22:08.670Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
