import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const notificationDeclarations = {
  id: "01a0620a-a166-7152-bc6c-c9ce7bb3739c",
  type: "page-type/type-declaration",
  slug: "notification-declarations",
  definition: "the Lua and game names this addon reaches without importing them",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the names the code here reaches are declared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file reaching a declared name imports this module for the declaration.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "This module restates declarations the game keeps outside akasha.",
    },
  ],
} as const satisfies TypeDeclaration
