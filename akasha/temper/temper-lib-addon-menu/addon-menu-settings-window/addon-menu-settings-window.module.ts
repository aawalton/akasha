import type { Module } from "@akasha/code-system/module"

export const addonMenuSettingsWindow = {
  id: "01a06100-0000-7000-8000-000000000008",
  pageTypeSlug: "module",
  slug: "addon-menu-settings-window",
  definition: "the top-level Addons window and its entry in the game's settings menu",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A console client without keyboard UI support is given no settings menu entry.",
    },
    {
      invariantKind: "departure",
      statement:
        "The window and its scene fragment are created on first request rather than at load.",
    },
    {
      invariantKind: "departure",
      statement: "A panel registered before addon loading completes is reported to chat.",
    },
    {
      invariantKind: "departure",
      statement: "The addon list is sorted by name once on the first opening of the panel.",
    },
  ],
} as const satisfies Module
