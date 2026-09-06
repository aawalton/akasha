import type { Question } from "../question.page-type.ts"

export const whenYouReadStoriesWithAudioNarrationWhichDoYouUse = {
  id: "019f9448-161d-72f2-beae-51ff5883724d",
  pageTypeSlug: "question",
  slug: "when-you-read-stories-with-audio-narration-which-do-you-use",
  ask: "When you read stories with audio narration, which do you use — desktop Chrome/Firefox, or iPhone Safari / the iOS app?",
  askedBy: "astra",
  askedIn: "019f8b2d-40d8-7c8d-89a9-3f111c3b7ea6",
  status: "answered",
  offered: ["Desktop (Chrome/Firefox)", "iPhone (Safari / iOS app)", "Both"],
  answer: "Desktop = Bazzite/Brave\nMobile = iOS/Native App",
  closedAt: "2026-07-24T13:20:32.340Z",
  context: "txt",
} as const satisfies Question
