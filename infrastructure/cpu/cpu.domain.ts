import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const cpu = {
  id: "01a09188-434b-7baf-af6f-d0957f02cb86",
  type: "page-type/domain",
  slug: "cpu",
  definition: "the time a program spends on a processor",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "processor" },
    { partOfSpeech: "part-of-speech/noun", spelling: "processors" },
  ],
  parts: ["domain/cpu-limit", "page-type/cpu-kind"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The processor time a host has is one pool every program on that host draws from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Processor time one program takes is time no other program can have.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A program given less processor time runs slower rather than failing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Processor time nobody takes in a second is gone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A host short of processor time ends nothing.",
    },
  ],
} as const satisfies Domain
