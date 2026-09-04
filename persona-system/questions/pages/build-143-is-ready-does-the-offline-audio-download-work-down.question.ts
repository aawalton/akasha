import type { Question } from "../question.page-type.ts"

export const build143IsReadyDoesTheOfflineAudioDownloadWorkDown = {
  id: "019f7a0b-b39f-7b6c-9ae5-796e6a26b9d9",
  pageTypeSlug: "question",
  slug: "build-143-is-ready-does-the-offline-audio-download-work-down",
  ask: "Build 143 is ready — does the offline audio download work? (download a chapter's audio, relaunch mid-download, play offline)",
  askedBy: "astra",
  askedIn: "019f3c83-7bbb-7c21-8d46-2b6c5fc68ea4",
  status: "answered",
  offered: [
    "Download + resume + offline playback all work",
    "Downloads but resume restarts from zero (I'll describe)",
    "Download fails (I'll describe)",
    "Something else (I'll describe)",
  ],
  answer: "Assume success, I’ll watch for issues",
  closedAt: "2026-07-19T11:05:48.871Z",
  context: "txt",
} as const satisfies Question
