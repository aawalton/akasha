import type { PythonModule } from "akasha/code/python-module/python-module.page-type.types.ts"

export const btw5 = {
  id: "01a06864-40db-7ab8-867f-5c628bb6ad8d",
  type: "page-type/python-module",
  slug: "btw5",
  definition:
    "the Creative BT-W5 transmitter's codec and headset mode set over its hidraw interface",
  python: "py",
  bytecodeDirectory: true,
  installPath: "~/.local/bin/btw5",
  onlyOn: "linux",
  createdAt: "2026-09-03T17:49:55.803Z",
  updatedAt: "2026-09-22T14:17:23.000Z",
} as const satisfies PythonModule
