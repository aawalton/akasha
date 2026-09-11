import type { PythonModule } from "akasha/code-system/python-modules/python-module.page-type.types.ts"

export const upscaleSrpoGraph = {
  id: "01a06815-9efd-7034-ad3f-3336504783e8",
  pageTypeSlug: "python-module",
  type: "python-module",
  slug: "upscale-srpo-graph",
  definition: "the graph refining skin at a low denoise",
  python: "py",
  bytecodeDirectory: true,
} as const satisfies PythonModule
