import type { Module } from "@akasha/code-system/module"

export const keyboardRegistry = {
  id: "01a05be9-d4c7-787e-a190-6647b46fad91",
  pageTypeSlug: "module",
  slug: "keyboard-registry",
  definition: "what a key binding holds and how a key event is matched against it",
  code: "ts",
} as const satisfies Module
