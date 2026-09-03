import type { Question } from "../question.page-type.ts"

export const hlsStreamingIsLiveDoesTheLongChapterStartWithinSec = {
  id: "019f764c-4209-746d-985c-7bcb45fefdcc",
  pageTypeSlug: "question",
  slug: "hls-streaming-is-live-does-the-long-chapter-start-within-sec",
  ask: "HLS streaming is live — does the long chapter start within seconds on your phone now?",
  askedBy: "echo",
  askedIn: "019f6988-baef-7f77-b7f6-a338b4498026",
  status: "answered",
  offered: [
    "Yes — starts in seconds, keeps playing",
    "Starts but stalls partway",
    "Still waits / errors",
  ],
  answer: "Yes — starts in seconds, keeps playing",
  closedAt: "2026-07-18T17:36:46.602Z",
  context: "txt",
} as const satisfies Question
