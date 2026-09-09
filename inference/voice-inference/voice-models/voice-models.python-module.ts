import type { PythonModule } from "@akasha/code/python-module"

export const voiceModels = {
  id: "01a06815-9efd-7017-a88f-f6cd228dc99c",
  pageTypeSlug: "python-module",
  type: "python-module",
  slug: "voice-models",
  definition: "the models a voice service holds on its card",
  python: "py",
  bytecodeDirectory: true,
} as const satisfies PythonModule
