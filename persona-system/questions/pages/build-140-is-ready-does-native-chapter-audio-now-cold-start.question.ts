import type { Question } from "../question.page-type.ts"

export const build140IsReadyDoesNativeChapterAudioNowColdStart = {
  id: "019f762c-0637-741b-9b19-45d9658bea7c",
  pageTypeSlug: "question",
  slug: "build-140-is-ready-does-native-chapter-audio-now-cold-start",
  ask: "Build 140 is ready — does native chapter audio now cold-start properly on your iPhone (visible download, then playback, no hang)?",
  askedBy: "astra",
  askedIn: "019f3c83-7bbb-7c21-8d46-2b6c5fc68ea4",
  status: "answered",
  offered: [
    "Works — download visible, audio plays",
    "Fallback kicked in (audio played, but via stream)",
    "Still hangs (I'll describe)",
    "Something else (I'll describe)",
  ],
  answer: "Download got to 20% and then the progress bar disappeared. No audio out so far.",
  closedAt: "2026-07-18T17:09:11.804Z",
  context: "txt",
} as const satisfies Question
