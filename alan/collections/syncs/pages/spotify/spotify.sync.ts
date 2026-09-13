import type { Sync } from "akasha/alan/collections/syncs/sync.page-type.types.ts"

export const spotify = {
  id: "01a09c83-672c-7d6e-a2bd-3bdfc162b992",
  type: "sync",
  slug: "spotify",
  syncRuns: "jsonl",
} as const satisfies Sync
