import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const sessionStream = {
  id: "01a06983-278f-7a83-9918-2c291cd81291",
  type: "module",
  slug: "session-stream",
  definition: "a session's object key, and the byte ranges synced to the object store",
  code: "ts",
} as const satisfies Module
