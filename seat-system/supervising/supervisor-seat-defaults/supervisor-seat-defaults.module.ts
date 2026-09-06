import type { Module } from "@akasha/code/module"

export const supervisorSeatDefaults = {
  id: "01a06876-abda-700e-b7c6-fdaa53c08fc1",
  pageTypeSlug: "module",
  slug: "supervisor-seat-defaults",
  definition: "the mode, stating and slots a seat declares as its defaults",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The stating module is imported from beside this module and its function called.",
    },
    {
      invariantKind: "absence",
      statement: "No command is spawned to state a seat's defaults.",
    },
    {
      invariantKind: "departure",
      statement: "A seat already holding every default is left alone.",
    },
  ],
} as const satisfies Module
