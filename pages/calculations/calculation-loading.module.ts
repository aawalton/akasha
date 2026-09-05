import type { Module } from "@akasha/code-system/module"

export const calculationLoading = {
  id: "01a071f0-b9d7-754a-83dc-36f3c40b2d10",
  pageTypeSlug: "module",
  slug: "calculation-loading",
  definition: "the function a computed property's code file exports, taken from that file's text",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A calculation is the export named `work`.",
    },
    {
      invariantKind: "departure",
      statement: "A code file exporting no `work` is refused by what that file does export.",
    },
    {
      invariantKind: "departure",
      statement: "A code file importing a value rather than a type does not load.",
    },
    {
      invariantKind: "departure",
      statement:
        "A calculation is read from the text of its code file rather than through an import.",
    },
    {
      invariantKind: "departure",
      statement: "A type an import names is gone before the text is run.",
    },
    {
      invariantKind: "departure",
      statement: "The pages package reaches a calculation without naming the domain holding it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs the calculation it answers.",
    },
  ],
} as const satisfies Module
