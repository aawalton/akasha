import type { Question } from "../question.page-type.ts"

export const shouldINameEchoThePersonaLeadOfPackagesInfraVoice = {
  id: "019f8b61-c553-7189-90ac-e7f211381939",
  pageTypeSlug: "question",
  slug: "should-i-name-echo-the-persona-lead-of-packages-infra-voice",
  ask: "Should I name echo the persona lead of packages/infra/voice-infer? It names no lead today (that gap caused #15770's voice-side to mis-route to aranya), and echo is the de-facto owner — she's done the recent generation + render work on the stack.",
  askedBy: "astra",
  askedIn: "019f8b2d-40d8-7c8d-89a9-3f111c3b7ea6",
  status: "answered",
  offered: ["Yes — name echo the voice-infer lead", "Assign someone else", "Leave unowned for now"],
  answer: "Yes — name echo the voice-infer lead",
  closedAt: "2026-07-22T19:51:40.048Z",
  context: "txt",
} as const satisfies Question
