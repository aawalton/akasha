import type { Question } from "../question.page-type.ts"

export const doesShaestrelSCommittedVoiceStillSoundLikeThe001Yo = {
  id: "019f95f6-7094-7d0c-8236-4d6811c79a95",
  pageTypeSlug: "question",
  slug: "does-shaestrel-s-committed-voice-still-sound-like-the-001-yo",
  ask: "Does Shaestrel's committed voice still sound like the 001 you picked? I sent 3 clips of her runtime (cloned) voice — just checking the clone didn't drift before I lock Bar 6.",
  askedBy: "sophia",
  askedIn: "019f6a56-476e-7088-aead-6f8f8920ae4b",
  status: "answered",
  offered: [
    "Sounds like her — lock Bar 6",
    "Close, but something drifted",
    "Not right — re-chase the voice",
  ],
  answer: "Sounds like her — lock Bar 6",
  closedAt: "2026-07-24T21:10:13.037Z",
  context: "txt",
} as const satisfies Question
