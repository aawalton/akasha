import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shellNaming = {
  id: "01a072c8-44bf-7715-ac61-a04e16e5f422",
  type: "page-type/module",
  slug: "shell-naming",
  definition: "the name of the program a pid is running",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name is read where the kernel has the name rather than asked of a process table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pid nothing is running answers with no name rather than throwing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number that is no pid answers with no name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name has no line ending.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No child process is started here.",
    },
  ],
} as const satisfies Module
