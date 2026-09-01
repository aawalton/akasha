import type { Module } from "../module/module.page-type.ts"

export const codeRule = {
  id: "01a04ea7-b2ea-74df-8173-b596f1d191cc",
  pageTypeSlug: "module",
  slug: "code-rule",
  definition: "what a function does, read so that renaming it or what it binds says nothing new",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Two functions say the same thing when their shapes match with each bound name read as its order.",
    },
    {
      invariantKind: "departure",
      statement: "A name the function does not bind is read as the name is written.",
    },
    {
      invariantKind: "departure",
      statement: "Whether the file exports a function is answered beside its rule.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration carrying no body says no rule rather than saying an empty one.",
    },
    {
      invariantKind: "departure",
      statement: "The source is parsed with parent links.",
    },
    {
      invariantKind: "departure",
      statement:
        "A function's export status is answered by climbing from the function to the statement holding the function.",
    },
    {
      invariantKind: "absence",
      statement: "Only a function is read.",
    },
    {
      invariantKind: "absence",
      statement:
        "A rule spelled inline as an expression bound to nothing says no rule here whatsoever.",
    },
    {
      invariantKind: "absence",
      statement: "Only a renaming is defeated.",
    },
    {
      invariantKind: "absence",
      statement:
        "The same rule written as a loop for a call or with statements reordered reads as another rule.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or the index.",
    },
    {
      invariantKind: "absence",
      statement: "A rule is what the source says.",
    },
    {
      invariantKind: "absence",
      statement: "What is done with a rule is answered elsewhere.",
    },
  ],
} as const satisfies Module
