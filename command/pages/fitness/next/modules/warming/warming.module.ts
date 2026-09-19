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
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The raise is a run of cardio movements rather than one movement held for the whole time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A raise Alan's kit cannot carry is no raise to offer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The raises sharing a muscle with the work to come lead the run, and the rest fill in behind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The raise Alan performed longest ago leads those it is ordered against.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day parts raises Alan has gone equally long without.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What Alan raised with is read from the sets he logged as cardio.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "A raise Alan performs without logging it ages no further, so the day alone varies it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A raise is performed off one step, and a movement needing more than one is no raise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No one movement raises Alan for longer than the seconds the policy allows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The run holds the raising minutes divided by those seconds, and one raise at the least.",
    },
  ],
} as const satisfies Module
