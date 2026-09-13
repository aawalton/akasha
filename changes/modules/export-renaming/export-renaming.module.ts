import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const exportRenaming = {
  id: "01a09c33-ec44-72ad-8f25-59c72db27e3a",
  type: "module",
  slug: "export-renaming",
  definition: "the edits spelling a name one body exports anew over the paths handed in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name is found by the typing rather than by matching the text of a body.",
    },
    {
      invariantKind: "departure",
      statement: "A name the body declares and exports nowhere is spelled anew over that body.",
    },
    {
      invariantKind: "departure",
      statement: "A body the rename would change and that reaches the new name already is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body naming no such name is left as that body is.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which paths the name is spelled over.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a change.",
    },
  ],
} as const satisfies Module
