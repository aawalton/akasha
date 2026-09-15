import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const commandTreeIds = {
  id: "01a07c93-698e-7ff9-8d61-dad8d2cd54f0",
  type: "module",
  slug: "command-tree-ids",
  definition: "the strings the editor knows the command tree's view and refresh command by",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The names here are the names the extension manifest has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refresh command's name opens with the view's name.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here makes the view or the command these names reach.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here names a row of the command tree.",
    },
  ],
} as const satisfies Module
