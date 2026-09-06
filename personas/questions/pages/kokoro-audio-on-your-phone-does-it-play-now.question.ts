import type { Question } from "../question.page-type.ts"

export const kokoroAudioOnYourPhoneDoesItPlayNow = {
  id: "019f752c-6dba-76e9-b2b7-8184cb810482",
  pageTypeSlug: "question",
  slug: "kokoro-audio-on-your-phone-does-it-play-now",
  ask: "Kokoro audio on your phone: does it play now?",
  askedBy: "echo",
  askedIn: "019f6988-baef-7f77-b7f6-a338b4498026",
  status: "answered",
  offered: ["Works — playback + seek both good", "Plays but seek/resume off", "Still errors"],
  answer: "Works — playback + seek both good",
  closedAt: "2026-07-18T12:22:11.040Z",
  context: "txt",
} as const satisfies Question
