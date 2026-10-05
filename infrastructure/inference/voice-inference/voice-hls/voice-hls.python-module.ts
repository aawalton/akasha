import type { PythonModule } from "akasha/code/python-module/python-module.page-type.types.ts"

export const voiceHls = {
  id: "01a10dc2-55b9-77f6-8779-9e5afb3337db",
  type: "page-type/python-module",
  slug: "voice-hls",
  definition: "the cutting of an encoded voice stream into the pieces of an HLS playlist",
  python: "py",
  bytecodeDirectory: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A player joins a narration at its first piece rather than at the newest one.",
    },
  ],
} as const satisfies PythonModule
