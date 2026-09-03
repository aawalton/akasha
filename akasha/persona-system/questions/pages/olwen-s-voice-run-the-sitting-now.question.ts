import type { Question } from "../question.page-type.ts"

export const olwenSVoiceRunTheSittingNow = {
  id: "019f6e68-4875-736e-a3c9-0f1fc624ceb8",
  pageTypeSlug: "question",
  slug: "olwen-s-voice-run-the-sitting-now",
  ask: "Olwen's voice — run the sitting now?",
  askedBy: "sophia",
  askedIn: "019f6a56-476e-7088-aead-6f8f8920ae4b",
  status: "answered",
  offered: ["Now — let's hear her", "Later today", "Next sitting"],
  closedAt: "2026-07-17T04:50:58.456Z",
  context: "txt",
} as const satisfies Question
