import type { Module } from "../modules/module.page-type.ts"

export const codeRule = {
  id: "01a04ea7-b2ea-74df-8173-b596f1d191cc",
  pageTypeSlug: "module",
  type: "module",
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
      statement: "Whether a function only passes names along is answered beside its rule.",
    },
    {
      invariantKind: "departure",
      statement: "A body with a literal or an operator says something of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A body holding no literal and no operator only passes names along.",
    },
    {
      invariantKind: "departure",
      statement: "A template joining names is no literal, however many names that template joins.",
    },
    {
      invariantKind: "departure",
      statement: "A backtick string with no name is a literal as a quoted string is.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration with no body says no rule rather than saying an empty rule.",
    },
    {
      invariantKind: "departure",
      statement: "The source is parsed with parent links.",
    },
    {
      invariantKind: "departure",
      statement: "A body spelling neither `function` nor `=>` is answered without a parse.",
    },
    {
      invariantKind: "departure",
      statement:
        "A function's export status is answered by climbing to the statement with that function.",
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
      statement: "A rule is the thing the source says.",
    },
    {
      invariantKind: "absence",
      statement: "The use a rule is put to is answered elsewhere.",
    },
  ],
} as const satisfies Module
