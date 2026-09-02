import type { Module } from "@akasha/code-system/module"

export const addonKeybindsStrings = {
  id: "01a0605a-051b-7d43-abd2-39b4b9801409",
  pageTypeSlug: "module",
  slug: "addon-keybinds-strings",
  definition: "the two names the split halves of the keybindings menu are shown under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The names are English and are not translated.",
    },
  ],
} as const satisfies Module
