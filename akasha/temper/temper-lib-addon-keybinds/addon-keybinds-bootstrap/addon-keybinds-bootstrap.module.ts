import type { Module } from "@akasha/code-system/module"

export const addonKeybindsBootstrap = {
  id: "01a0605a-0518-7c9d-94e2-4a1ec6390fe3",
  pageTypeSlug: "module",
  slug: "addon-keybinds-bootstrap",
  definition: "the library put on the globals and the wait for the game's keybinding screen",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A second load returns without touching the library already in place.",
    },
    {
      invariantKind: "departure",
      statement: "The keyboard keybinding manager is preferred over the shared keybinding manager.",
    },
    {
      invariantKind: "constraint",
      statement: "A missing keybinding manager is an error rather than a quiet return.",
    },
    {
      invariantKind: "departure",
      statement: "The wait is dropped before being set up again.",
    },
  ],
} as const satisfies Module
