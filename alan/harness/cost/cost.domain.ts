import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const cost = {
  id: "01a08b96-f6dd-7d5f-b99c-f87675def793",
  type: "page-type/domain",
  slug: "cost",
  definition: "the stress Alan endures in an hour",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "cost" },
    { partOfSpeech: "part-of-speech/noun", spelling: "costs" },
  ],
  parts: [
    "module/cost-color",
    "module/cost-reading",
    "module/cost-stoplight",
    "readout/cost-multiplier",
    "service-workstation/cost-relay-service",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The cost is the multiplier the open block's safety and difficulty price the block at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cost of one multiplier is the most Alan can pay all day without draining.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The color a cost takes is read with the surplus rather than from the cost alone.",
    },
  ],
} as const satisfies Domain
