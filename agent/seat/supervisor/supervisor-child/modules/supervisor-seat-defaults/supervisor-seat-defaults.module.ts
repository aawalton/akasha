import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorSeatDefaults = {
  id: "01a06876-abda-700e-b7c6-fdaa53c08fc1",
  type: "module",
  slug: "supervisor-seat-defaults",
  definition: "the mode, stating and slots a seat declares as its defaults",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The stating module is imported from beside this module and its function called.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No command is spawned to state a seat's defaults.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The defaults a seat is given are handed over as values rather than as a payload.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat already with every default is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat akasha holds no page for is stated rather than left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A boot whose seat akasha still holds no page for waits for the page history gives back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stating that failed is said rather than swallowed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stating that failed leaves the boot going.",
    },
  ],
} as const satisfies Module
