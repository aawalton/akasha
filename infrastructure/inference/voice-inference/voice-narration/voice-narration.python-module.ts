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
  ],
} as const satisfies PythonModule
