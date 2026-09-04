import type { Question } from "../question.page-type.ts"

export const testflightBuild138IsReadyToInstallDoesChapterAudio = {
  id: "019f7443-5ae3-7839-8e8d-e88916120d2e",
  pageTypeSlug: "question",
  slug: "testflight-build-138-is-ready-to-install-does-chapter-audio",
  ask: "TestFlight build 138 is ready to install — does chapter audio now play in the shell, and have the mystery refreshes stopped?",
  askedBy: "astra",
  askedIn: "019f3c83-7bbb-7c21-8d46-2b6c5fc68ea4",
  status: "answered",
  offered: [
    "Both work — audio plays, no refreshes",
    "Audio works, still seeing refreshes",
    "Audio still errors",
    "Something else (I'll describe)",
  ],
  answer: "Both work — audio plays, no refreshes",
  closedAt: "2026-07-18T08:07:58.148Z",
  context: "txt",
} as const satisfies Question
