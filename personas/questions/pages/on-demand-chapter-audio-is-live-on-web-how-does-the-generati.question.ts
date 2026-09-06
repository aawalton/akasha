import type { Question } from "../question.page-type.ts"

export const onDemandChapterAudioIsLiveOnWebHowDoesTheGenerati = {
  id: "019f746f-598a-745e-8ae7-5083db3c36b3",
  pageTypeSlug: "question",
  slug: "on-demand-chapter-audio-is-live-on-web-how-does-the-generati",
  ask: "On-demand chapter audio is live on web — how does the generating-wait and Kokoro voice quality feel to you?",
  askedBy: "astra",
  askedIn: "019f3c83-7bbb-7c21-8d46-2b6c5fc68ea4",
  status: "answered",
  offered: [
    "Wait + quality both fine — ship it as is",
    "Quality fine, wait too long — escalate to streaming",
    "Quality not good enough (I'll describe)",
    "Something's broken (I'll describe)",
  ],
  answer:
    "I do think we need the streaming version, but it can wait until after the native. For long chapters like TWI (sometimes 30-50k words) the pre-generation time scales with the length.",
  closedAt: "2026-07-18T08:59:05.013Z",
  context: "txt",
} as const satisfies Question
