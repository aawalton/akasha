import type { PythonModule } from "akasha/code-system/python-modules/python-module.page-type.types.ts"

export const wanFrameScoring = {
  id: "01a06815-9efd-7022-88a4-0adf23d8e3d9",
  pageTypeSlug: "python-module",
  type: "python-module",
  slug: "wan-frame-scoring",
  definition: "how near each frame's face is to a reference face",
  python: "py",
  bytecodeDirectory: true,
} as const satisfies PythonModule
