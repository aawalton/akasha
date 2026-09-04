import type { Question } from "../question.page-type.ts"

export const doesTheKeeperUnrevivableNotificationArriveOnYourDevi = {
  id: "019fa64b-70db-79d0-97b8-e06359532b61",
  pageTypeSlug: "question",
  slug: "does-the-keeper-unrevivable-notification-arrive-on-your-devi",
  ask: "Does the keeper-unrevivable notification arrive on your device, and does it read clearly enough that you know what happened without going to look?",
  askedBy: "athena",
  askedIn: "019f9d68-65b6-7dd3-a6ed-77f8b0d9b6e4",
  status: "answered",
  offered: [
    "Yes — arrives and reads clearly. Close it.",
    "Arrives, but the wording needs work — I will say how.",
    "Never arrived on my device.",
  ],
  answer: "Yes — arrives and reads clearly. Close it.",
  closedAt: "2026-07-28T08:26:47.904Z",
  context: "txt",
} as const satisfies Question
