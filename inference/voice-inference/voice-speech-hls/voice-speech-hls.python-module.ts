import type { PythonModule } from "akasha/code-system/python-modules/python-module.page-type.types.ts"

export const voiceSpeechHls = {
  id: "01a06815-9efd-701a-88c8-c37cdfb8110a",
  pageTypeSlug: "python-module",
  type: "python-module",
  slug: "voice-speech-hls",
  definition: "a rendition encoded as mp3 segments under a growing playlist",
  python: "py",
  bytecodeDirectory: true,
} as const satisfies PythonModule
