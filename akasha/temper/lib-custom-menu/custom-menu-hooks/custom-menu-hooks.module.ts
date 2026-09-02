import type { Module } from "@akasha/code-system/module"

export const customMenuHooks = {
  id: "01a0605a-581e-714a-b5ed-989083626e25",
  pageTypeSlug: "module",
  slug: "custom-menu-hooks",
  definition: "the game's menu functions wrapped so custom entries survive",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A wrapper calls the function the wrapper replaced.",
    },
    {
      invariantKind: "departure",
      statement: "Clearing a menu releases every pooled row back to its pool.",
    },
    {
      invariantKind: "departure",
      statement: "A held modifier key turns an inventory context menu into a special one.",
    },
  ],
} as const satisfies Module
