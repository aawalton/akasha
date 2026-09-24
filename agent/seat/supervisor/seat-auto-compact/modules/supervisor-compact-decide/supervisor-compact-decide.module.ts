import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorCompactDecide = {
  id: "01a0c57e-03dc-7717-9ac2-10dfd4ab8a6f",
  type: "page-type/module",
  slug: "supervisor-compact-decide",
  definition: "whether a seat is to be asked to compact at this moment",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The context ceiling is the count a seat's conditions state an idle seat is compacted at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose context was not read is not asked to compact.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat already compacting is not asked to compact.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat holds the ask it was given until its context is read under the ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A context that was not read holds the ask rather than clearing it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whether a seat is worth a probe is answered apart from whether that seat is idle.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a process or a port or a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ceiling that could not be read asks no seat to compact.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat is idle where its turn has ended and nothing is being sent to it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose turn was never read is not idle.",
    },
  ],
} as const satisfies Module
