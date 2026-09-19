import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const warming = {
  id: "01a0b75d-7a11-7470-8520-71da591ec032",
  type: "page-type/module",
  slug: "warming",
  definition: "what Alan does before a working set, and whether he is warm already",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A warmup raises the temperature, mobilises the muscles, then ramps the movement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan is warm where a set of his falls inside the window handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An Alan already warm is owed the ramp alone, the raise having been paid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement ramped inside the window is owed no warmup at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set stating no instant leaves Alan cold, whatever day that set falls on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement mobilises where its pattern is mobility and its force is not static.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The movements offered are those sharing a muscle with the movement to come.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No held stretch is offered before a working set.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Whether a movement moves through a range is read from force rather than stated.",
    },
  ],
} as const satisfies Module
