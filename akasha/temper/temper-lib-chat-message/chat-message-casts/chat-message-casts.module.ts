import type { Module } from "@akasha/code-system/module"

export const chatMessageCasts = {
  id: "01a06060-0d14-7717-b700-44162c6cbf37",
  pageTypeSlug: "module",
  slug: "chat-message-casts",
  definition: "what an untyped chat value the game hands over is read as",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
} as const satisfies Module
