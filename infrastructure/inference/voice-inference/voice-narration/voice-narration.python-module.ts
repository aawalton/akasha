import type { PythonModule } from "akasha/code/python-module/python-module.page-type.types.ts"

export const voiceNarration = {
  id: "01a10dc2-55ba-7f26-ab58-a9330b850b47",
  type: "page-type/python-module",
  slug: "voice-narration",
  definition: "the narrations a voice service streams as growing playlists",
  python: "py",
  bytecodeDirectory: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A playlist names every piece made so far.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "iOS stops fetching once its buffer is full, so a playlist must grow on its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter marks where in the stream each segment begins, with the word it begins at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter also marks where each later sentence of a segment begins once spoken.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Kokoro opens a call with about 300 ms of silence and closes it with about 500 ms.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A segment's speech keeps 40 ms of quiet on either side and no more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pause after a segment is the gap heard after its speech.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sentence's mark moves back by the silence trimmed from its segment's start.",
    },
  ],
  createdAt: "2026-10-05T20:30:02.170Z",
  updatedAt: "2026-10-10T18:12:28.029Z",
} as const satisfies PythonModule
