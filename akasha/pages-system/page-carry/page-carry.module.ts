import type { Module } from "@akasha/code-system/module"

export const pageCarry = {
  id: "01a0686e-6807-7000-9245-b0c6335299c1",
  pageTypeSlug: "module",
  slug: "page-carry",
  definition: "a value read off a page carried as text, as a list of text, or as nothing",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value that is already text is carried as it stands.",
    },
    {
      invariantKind: "departure",
      statement: "A number and a boolean are carried as text.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value that is neither text, a number, a boolean nor a list is carried as its JSON.",
    },
    {
      invariantKind: "departure",
      statement: "A value that is absent is carried as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A value that is absent is carried as an empty list where a list is asked for.",
    },
    {
      invariantKind: "departure",
      statement: "Text carried into a list is trimmed, and text that trims away lists as nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
