import type { Question } from "../question.page-type.ts"

export const testflightBuild139OnDeviceChapterAudioIsReadyDoesN = {
  id: "019f74f1-c11d-7913-8c0f-d97f5ea9f6f7",
  pageTypeSlug: "question",
  slug: "testflight-build-139-on-device-chapter-audio-is-ready-does-n",
  ask: "TestFlight build 139 (on-device chapter audio) is ready — does native playback work well on your iPhone, including a very long TWI chapter?",
  askedBy: "astra",
  askedIn: "019f3c83-7bbb-7c21-8d46-2b6c5fc68ea4",
  status: "answered",
  offered: [
    "All three work — native audio is good",
    "Works, but TWI-length has problems (I'll describe)",
    "Model download issues (I'll describe)",
    "Something else broken (I'll describe)",
  ],
  answer:
    "Didn’t see progress for the model download, both seem to hang at generating audio and not progress",
  closedAt: "2026-07-18T11:23:31.114Z",
  context: "txt",
} as const satisfies Question
