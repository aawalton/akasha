import type { Question } from "../question.page-type.ts"

export const yourNotesOnTheAlanPersonaPageWereWipedOn20260724 = {
  id: "019f991a-c548-762f-9451-520d08ff07f7",
  pageTypeSlug: "question",
  slug: "your-notes-on-the-alan-persona-page-were-wiped-on-2026-07-24",
  ask: "Your notes on the alan persona page were wiped on 2026-07-24 and have been empty since. Want me to restore them?",
  askedBy: "sophia",
  askedIn: "019f6a56-476e-7088-aead-6f8f8920ae4b",
  status: "answered",
  offered: [
    "Yes — restore my notes",
    "No — I cleared it deliberately, leave it",
    "Restore, and chase down what wiped it",
  ],
  answer: "No — I cleared it deliberately, leave it",
  closedAt: "2026-07-25T11:48:38.444Z",
  context: "txt",
} as const satisfies Question
