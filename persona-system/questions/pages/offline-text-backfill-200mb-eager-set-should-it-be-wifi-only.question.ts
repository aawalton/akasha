import type { Question } from "../question.page-type.ts"

export const offlineTextBackfill200mbEagerSetShouldItBeWifiOnly = {
  id: "019f7654-6f58-7b2d-b075-1e064b034e8e",
  pageTypeSlug: "question",
  slug: "offline-text-backfill-200mb-eager-set-should-it-be-wifi-only",
  ask: "Offline text backfill (~200MB eager set): should it be wifi-only, or is paced trickle over any connection fine?",
  askedBy: "astra",
  askedIn: "019f3c83-7bbb-7c21-8d46-2b6c5fc68ea4",
  status: "answered",
  offered: [
    "Trickle is fine, don't gate — close #15745",
    "Wifi-only for the eager backfill",
    "Wifi-only for everything offline-sync",
  ],
  answer: "Trickle is fine, don't gate — close #15745",
  closedAt: "2026-07-18T17:48:29.374Z",
  context: "txt",
} as const satisfies Question
