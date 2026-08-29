import type { Module } from "./module/module.page-type.ts"

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
        "Two functions say the same thing when their shape is the same once every name a function binds is read as the order it binds them, so renaming the function, a parameter or a local hides nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name the function does not bind is read as it is written, so what it reaches for is part of what it says.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether the file exports a function is answered beside its rule, because who may reach for it cannot be read from the rule.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration carrying no body says no rule, rather than saying an empty one.",
    },
    {
      invariantKind: "departure",
      statement:
        "The source is parsed with parent links, because whether a function is exported is answered by climbing from it to the statement holding it.",
    },
    {
      invariantKind: "absence",
      statement:
        "Only a function is read. A rule spelled inline, as an expression bound to nothing, says no rule here at all.",
    },
    {
      invariantKind: "absence",
      statement:
        "Only a renaming is defeated. The same rule written to a different shape — a loop for a call, statements reordered — reads as another rule.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here reads the disk or the index. A rule is what the source says, and what is done with it is answered elsewhere.",
    },
  ],
} as const satisfies Module
