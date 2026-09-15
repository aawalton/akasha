import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shellNaming = {
  id: "01a072c8-44bf-7715-ac61-a04e16e5f422",
  type: "module",
  slug: "shell-naming",
  definition: "the name of the program a pid is running",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A name is read where the kernel has the name rather than asked of a process table.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pid nothing is running answers with no name rather than throwing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A number that is no pid answers with no name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name has no line ending.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No child process is started here.",
    },
  ],
} as const satisfies Module
