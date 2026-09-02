import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const cliArgs = {
  id: "01a06287-7841-7a70-bbb2-973c9c17ce4e",
  pageTypeSlug: "module",
  slug: "cli-args",
  definition: "the flags and positionals read off a command line against a declared shape",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A flag the shape does not declare is refused rather than admitted.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A refused flag close in spelling to a declared flag is answered with the declared flag named.",
    },
    {
      invariantKind: "constraint",
      statement: "A flag declared boolean takes no value.",
    },
    {
      invariantKind: "constraint",
      statement: "A flag declared required and left unsaid refuses the whole line.",
    },
    {
      invariantKind: "constraint",
      statement: "A flag name is said on the line in kebab case and read back in camel case.",
    },
  ],
} as const satisfies Module
