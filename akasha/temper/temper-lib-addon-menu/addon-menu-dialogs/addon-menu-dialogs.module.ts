import type { Module } from "@akasha/code-system/module"

export const addonMenuDialogs = {
  id: "01a06100-0000-7000-8000-000000000003",
  pageTypeSlug: "module",
  slug: "addon-menu-dialogs",
  definition: "the reset-to-defaults and reload-UI dialogs and the panel reopened after a reload",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The panel to reopen is stored in saved variables before the UI reloads.",
    },
    {
      invariantKind: "departure",
      statement:
        "Discarding restores every reload-flagged control to the value that control had on creation.",
    },
    {
      invariantKind: "departure",
      statement: "Dismissing the reload dialog without choosing discards the changes.",
    },
    {
      invariantKind: "constraint",
      statement: "Dialog descriptors are created once and kept in the game's global dialog table.",
    },
  ],
} as const satisfies Module
