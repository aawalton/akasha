import type { PythonModule } from "@akasha/code/python-module"

export const segmentRembgServer = {
  id: "01a06815-9efd-7014-a878-84a434393806",
  pageTypeSlug: "python-module",
  type: "python-module",
  slug: "segment-rembg-server",
  definition: "the server that cuts a subject out of an image",
  python: "py",
  bytecodeDirectory: true,
} as const satisfies PythonModule
