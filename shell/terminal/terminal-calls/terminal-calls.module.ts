import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const terminalCalls = {
  id: "01a0950e-c46b-7001-9da6-533a75125803",
  type: "module",
  slug: "terminal-calls",
  definition: "the calls a terminal's shell makes, composed from the pages that name their levels",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call here is worked out from the pages rather than spelled as words.",
    },
    {
      invariantKind: "departure",
      statement: "A level names itself on its own page, and the call takes that name.",
    },
    {
      invariantKind: "departure",
      statement: "A level renamed on its page is a call renamed here with no edit.",
    },
    {
      invariantKind: "departure",
      statement: "Every level of every call here is named in the one list.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index or the disk.",
    },
    {
      invariantKind: "gap",
      statement:
        "A level put between two named here is left whole in the call until this names it.",
    },
  ],
} as const satisfies Module
