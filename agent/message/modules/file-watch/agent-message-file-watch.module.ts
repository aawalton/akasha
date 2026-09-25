import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentMessageFileWatch = {
  id: "01a06964-d998-7aac-b1db-05b91d24ad90",
  type: "page-type/module",
  slug: "agent-message-file-watch",
  definition: "how code watches a folder for messages sent to a seat",
  code: "ts",
} as const satisfies Module
