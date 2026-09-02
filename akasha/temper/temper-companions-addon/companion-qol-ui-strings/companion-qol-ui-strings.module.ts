import type { Module } from "@akasha/code-system/module"

export const companionQolUiStrings = {
  id: "01a0611d-84cf-7108-b5a0-b6dd7fb82ad8",
  pageTypeSlug: "module",
  slug: "companion-qol-ui-strings",
  definition: "the words the quality-of-life settings menu reads as",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every string is added under an id the settings menu names.",
    },
  ],
} as const satisfies Module
