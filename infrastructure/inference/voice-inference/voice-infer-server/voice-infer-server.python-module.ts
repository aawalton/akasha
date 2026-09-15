import type { PythonModule } from "akasha/code/python-module/python-module.page-type.types.ts"

export const voiceInferServer = {
  id: "01a06815-9efd-7016-9a26-398afcd69f90",
  type: "page-type/python-module",
  slug: "voice-infer-server",
  definition: "the routes a voice service answers",
  python: "py",
  bytecodeDirectory: true,
} as const satisfies PythonModule
