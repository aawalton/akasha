import type { Module } from "@akasha/code-system/module"

export const sessionStream = {
  id: "01a06983-278f-7a83-9918-2c291cd81291",
  pageTypeSlug: "module",
  slug: "session-stream",
  definition: "a session's object key, and the byte ranges synced to the object store",
  code: "ts",
} as const satisfies Module
