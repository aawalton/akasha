import type { PythonModule } from "akasha/code/python-module/python-module.page-type.types.ts"

export const voiceTiming = {
  id: "01a111c8-e14f-75da-8e7d-c8d9de6074f3",
  type: "page-type/python-module",
  slug: "voice-timing",
  definition: "when within a segment's speech each of its sentences begins",
  python: "py",
  bytecodeDirectory: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sentence begins where Kokoro's own timestamp says its first token begins.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where Kokoro gives no timestamp, a segment's speech is shared out by characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sentence never begins before the sentence ahead of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word in Kokoro's markup is counted as the word alone, as its token spells it.",
    },
  ],
  createdAt: "2026-10-06T15:15:39.983Z",
  updatedAt: "2026-10-08T17:45:20.561Z",
} as const satisfies PythonModule
