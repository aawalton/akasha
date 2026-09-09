import type { PythonModule } from "@akasha/code/python-module"

export const voiceSpeechMp3 = {
  id: "01a06815-9efd-7019-8ed2-fb4251b994b0",
  pageTypeSlug: "python-module",
  type: "python-module",
  slug: "voice-speech-mp3",
  definition: "a whole rendition encoded as one mp3",
  python: "py",
  bytecodeDirectory: true,
} as const satisfies PythonModule
