import type { Module } from "../../code-system/modules/module.page-type.ts"

export const shellNaming = {
  id: "01a072c8-44bf-7715-ac61-a04e16e5f422",
  pageTypeSlug: "module",
  slug: "shell-naming",
  definition: "the name of the program a pid is running",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name is read where the kernel holds it rather than asked of a process table.",
    },
    {
      invariantKind: "departure",
      statement: "A pid nothing is running answers with no name rather than throwing.",
    },
    {
      invariantKind: "departure",
      statement: "A number that is no pid answers with no name and is never looked for.",
    },
    {
      invariantKind: "departure",
      statement: "A name carries no line ending.",
    },
    {
      invariantKind: "absence",
      statement: "No child process is started here.",
    },
  ],
} as const satisfies Module
