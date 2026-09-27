import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const navItemActions = {
  id: "01a061ee-786e-7007-b985-51d9bb9dea95",
  type: "page-type/module",
  slug: "nav-item-actions",
  definition: "The actions offered on a nav item, including deleting it.",
  code: "tsx",
  test: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A nav item is deleted only after its deletion is asked for and confirmed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The button opening a nav item's actions is named and shows while it has focus.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Clicking the button opening a nav item's actions does not follow the item's link.",
    },
  ],
} as const satisfies Module
