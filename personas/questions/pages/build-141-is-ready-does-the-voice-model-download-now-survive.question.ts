import type { Question } from "../question.page-type.ts"

export const build141IsReadyDoesTheVoiceModelDownloadNowSurvive = {
  id: "019f767f-51a0-76aa-afe0-03e9cb1e3826",
  pageTypeSlug: "question",
  slug: "build-141-is-ready-does-the-voice-model-download-now-survive",
  ask: "Build 141 is ready — does the voice-model download now survive a hiccup, and do failures show a clear error instead of a silent reset?",
  askedBy: "astra",
  askedIn: "019f3c83-7bbb-7c21-8d46-2b6c5fc68ea4",
  status: "answered",
  offered: [
    "Download survives drops + errors are visible — both good",
    "Errors visible, but download still dies (I'll describe)",
    "Download fine, error handling off (I'll describe)",
    "Something else (I'll describe)",
  ],
  answer: "Can’t really test since download is just complete. Assume success",
  closedAt: "2026-07-18T18:39:49.710Z",
  context: "txt",
} as const satisfies Question
