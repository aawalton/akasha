import type { Module } from "@akasha/code-system/module"

export const chatMessageMain = {
  id: "01a06060-0d18-71c4-bf35-67299b7e568b",
  pageTypeSlug: "module",
  slug: "chat-message-main",
  definition: "the order the chat message library installs its parts in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The public global is put in place before the formatters install.",
    },
  ],
} as const satisfies Module
