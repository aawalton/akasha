import type { PythonModule } from "akasha/code-system/python-modules/python-module.page-type.types.ts"

export const btw5 = {
  id: "01a06864-40db-7ab8-867f-5c628bb6ad8d",
  pageTypeSlug: "python-module",
  type: "python-module",
  slug: "btw5",
  definition:
    "the Creative BT-W5 transmitter's codec and headset mode set over its hidraw interface",
  python: "py",
  bytecodeDirectory: true,
} as const satisfies PythonModule
