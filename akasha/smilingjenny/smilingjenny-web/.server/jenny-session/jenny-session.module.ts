import type { Module } from "@akasha/code-system/module"

export const jennySession = {
  id: "01a06558-c2cc-700d-928b-e34abee70b6c",
  pageTypeSlug: "module",
  slug: "jenny-session",
  definition: "who a request is served as, and where a caller signed in as nobody is sent",
  code: "ts",
} as const satisfies Module
