import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const subagentReading = {
  id: "01a0686b-bfe9-77b0-aecf-6c31f4ae928a",
  type: "module",
  slug: "subagent-reading",
  definition:
    "the subagents running under each seat, folded out of the bytes each transcript gained",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A transcript is folded from where the last fold stopped rather than from its first byte.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file that no longer reads the way that file did is folded again from its first byte.",
    },
    {
      invariantKind: "departure",
      statement:
        "A fold starting again drops the state the old fold knew rather than merging into that old fold.",
    },
    {
      invariantKind: "departure",
      statement: "A cursor already naming another file keeps its state and consults no book.",
    },
    {
      invariantKind: "departure",
      statement:
        "A banked offset is taken together with the anchor and the state or not taken at all.",
    },
    {
      invariantKind: "departure",
      statement: "An agent already read on one path is not read again anywhere below itself.",
    },
    {
      invariantKind: "departure",
      statement: "A row naming an agent already above that row is drawn with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent is descended into five deep and no deeper.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent naming no id that subagent runs under is descended into no further.",
    },
    {
      invariantKind: "departure",
      statement:
        "What finished under a seat is answered from that seat's fold and every fold beside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subagent one subagent dispatched has its finish recorded in the fold of whatever dispatched it.",
    },
    {
      invariantKind: "departure",
      statement: "A fold is read for what finished though whatever it folds has itself finished.",
    },
    {
      invariantKind: "departure",
      statement: "A folder that will not open leaves the seat's own fold as the whole answer.",
    },
    {
      invariantKind: "departure",
      statement: "An id any fold reads as running is dropped from what the folds read as finished.",
    },
    {
      invariantKind: "departure",
      statement: "A reading of a seat answers what runs under it and what has finished under it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading gathers what finished from every transcript that reading descends into.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent a running subagent finished is therefore answered as finished.",
    },
    {
      invariantKind: "departure",
      statement: "Both answers come from one fold of the seat's transcript.",
    },
    {
      invariantKind: "departure",
      statement: "A cursor no read touched is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "The fold is banked at most once in ten seconds.",
    },
    {
      invariantKind: "departure",
      statement: "A bank that fails costs a refold rather than a wrong row.",
    },
    {
      invariantKind: "departure",
      statement: "The bank is awaited.",
    },
    {
      invariantKind: "departure",
      statement: "A host reading the fleet once and exiting still banks.",
    },
    {
      invariantKind: "absence",
      statement: "A line that is no JSON object changes nothing.",
    },
  ],
} as const satisfies Module
