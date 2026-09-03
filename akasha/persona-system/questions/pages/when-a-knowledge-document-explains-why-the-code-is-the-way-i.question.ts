import type { Question } from "../question.page-type.ts"

export const whenAKnowledgeDocumentExplainsWhyTheCodeIsTheWayI = {
  id: "019fbaa2-2633-7592-952d-18039e7476a1",
  pageTypeSlug: "question",
  slug: "when-a-knowledge-document-explains-why-the-code-is-the-way-i",
  ask: "When a knowledge document explains *why* the code is the way it is, and a competent reader could reconstruct that reason from the source in a few minutes — does it stay or go? The review task says cut what Opus 5 would get right unaided; the knowledge schema says the section exists to hold exactly the investigation a reader would otherwise perform.",
  askedBy: "athena",
  askedIn: "019fba68-7d7f-7283-960d-10abb0f97555",
  status: "answered",
  offered: [
    "Keep a reason welded to a design choice, cut one that re-derives the code",
    "Keep the reasons — the knowledge kind is paid only by whoever arrives",
    "Cut them — Opus 5 reconstructs a reason it needs",
    "Settle it yourself and write it into the schema",
  ],
  answer:
    "I don’t see a universal rule here, case by case judging from the principles, especially Value",
  closedAt: "2026-08-01T00:05:56.536Z",
  context: "txt",
} as const satisfies Question
