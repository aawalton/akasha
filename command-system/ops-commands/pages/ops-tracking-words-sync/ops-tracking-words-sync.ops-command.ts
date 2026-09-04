import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsTrackingWordsSync = {
  id: "01a06935-6bd0-7f4d-93de-4715e6297e9c",
  pageTypeSlug: "ops-command",
  slug: "ops-tracking-words-sync",
  definition: "rewriting one day's wisdom and intelligence word counts from that day's commits.",
  opsPath: "tracking words-sync",
  opsEntryFile: "alan/tracking/daily/words-sync/words-sync.module.code.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
