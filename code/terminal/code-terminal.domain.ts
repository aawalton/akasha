import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const codeTerminal = {
  id: "01a0d3dd-91b9-7ba1-9e27-e649e1127230",
  type: "page-type/domain",
  slug: "code-terminal",
  definition: "the screen and keyboard a program reads and writes",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "terminal" },
    { partOfSpeech: "part-of-speech/noun", spelling: "terminals" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A terminal is a device rather than an end or a last state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A terminal an editor draws and a terminal the kernel gives are both terminals.",
    },
  ],
} as const satisfies Domain
