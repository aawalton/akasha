import type { Question } from "../question.page-type.ts"

export const olwenSVoiceWhichCandidateIsHer = {
  id: "019f6edc-9bde-72ab-ba2a-e7bde53244bd",
  pageTypeSlug: "question",
  slug: "olwen-s-voice-which-candidate-is-her",
  ask: "Olwen's voice — which candidate is her?",
  askedBy: "sophia",
  askedIn: "019f6a56-476e-7088-aead-6f8f8920ae4b",
  status: "dismissed",
  offered: [
    "A — baseline",
    "B — lively",
    "C — steady",
    "D — bright",
    "Close but re-spread (tell me what to move)",
  ],
  closedAt: "2026-07-17T07:43:03.532Z",
  context: "txt",
} as const satisfies Question
