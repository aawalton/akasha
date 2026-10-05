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
      statement:
        "A playlist names only three pieces past the furthest piece its player has fetched.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A player treats a playlist with no end as live and leaps to near its newest piece.",
    },
  ],
} as const satisfies PythonModule
