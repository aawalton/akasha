import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keybindingKeyCodes = {
  id: "01a1847d-4138-7576-bba3-dbed2d40d167",
  type: "page-type/module",
  slug: "keybinding-key-codes",
  definition: "the game's key codes and the constant names the game gives them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is named by the constant the game declares for its code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The constants bounding the codes, and the code for no key, name no key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code or a name the table holds nothing for is refused rather than passed over.",
    },
  ],
  createdAt: "2026-10-28T21:49:23.639Z",
  updatedAt: "2026-10-28T21:49:23.639Z",
} as const satisfies Module
