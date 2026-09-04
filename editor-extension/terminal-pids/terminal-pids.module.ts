import type { Module } from "../../code-system/modules/module.page-type.ts"

export const terminalPids = {
  id: "01a064f0-734e-706e-8699-1b47b8fea065",
  pageTypeSlug: "module",
  slug: "terminal-pids",
  definition: "the process id a terminal answers with and the outcome of asking each terminal",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A sweep of no terminals is answered without any wait.",
    },
    {
      invariantKind: "departure",
      statement: "Every terminal in one sweep is asked at once rather than one after another.",
    },
    {
      invariantKind: "departure",
      statement: "One expiry timer bounds a whole sweep rather than one timer for each terminal.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal answering nothing before the bound is read as never answered.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal whose answer fails is read as never answered rather than thrown.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal answering an undefined id is read as having no process.",
    },
    {
      invariantKind: "departure",
      statement: "A reading names the terminal that reading was taken from.",
    },
    {
      invariantKind: "departure",
      statement: "A tally counts the terminals swept as well as the terminals read.",
    },
    {
      invariantKind: "departure",
      statement: "A tally line names a count of zero only for the terminals read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A terminal is described by the options that terminal was created with rather than by an id.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal answering no id is left out of the pairs handed back.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names the editor's own terminal type.",
    },
  ],
} as const satisfies Module
