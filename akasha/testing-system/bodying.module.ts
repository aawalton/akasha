import type { Module } from "../code-system/module/module.page-type.ts"

export const bodying = {
  id: "01a04ee7-be07-7a1b-9f3f-f5e6d4693e70",
  pageTypeSlug: "module",
  slug: "bodying",
  definition: "the bytes, and the body standing at a path, that a test hands to what it tries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A test names the root once and is handed a way to make bodies under it, so the root is not spelled again at every body.",
    },
    {
      invariantKind: "departure",
      statement:
        "Text and bytes are both taken, because what a check is handed is bytes and what a test says is text.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a test binds is what it was handed, not a function of its own, so binding this again in ten test files says one thing ten times rather than ten things.",
    },
  ],
} as const satisfies Module
