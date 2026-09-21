import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const customMenuHooks = {
  id: "01a0605a-581e-714a-b5ed-989083626e25",
  type: "page-type/module",
  slug: "custom-menu-hooks",
  definition: "the game's menu functions wrapped so custom entries survive",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A wrapper calls the function the wrapper replaced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Clearing a menu releases every pooled row back to its pool.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A held modifier key turns an inventory context menu into a special menu.",
    },
  ],
} as const satisfies Module
