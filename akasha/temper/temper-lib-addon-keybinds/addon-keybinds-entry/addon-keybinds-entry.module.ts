import type { Module } from "@akasha/code-system/module"

export const addonKeybindsEntry = {
  id: "01a0605a-051c-7251-adf5-3039dae90ad3",
  pageTypeSlug: "module",
  slug: "addon-keybinds-entry",
  definition: "the call putting the keybinds library in place once the addon loads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bundle the transpiler writes starts here.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing waits on the caller to ask for the split.",
    },
  ],
} as const satisfies Module
