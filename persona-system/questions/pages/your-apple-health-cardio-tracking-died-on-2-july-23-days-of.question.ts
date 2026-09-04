import type { Question } from "../question.page-type.ts"

export const yourAppleHealthCardioTrackingDiedOn2July23DaysOf = {
  id: "019f989f-4213-79a0-8c33-095b21beb43b",
  pageTypeSlug: "question",
  slug: "your-apple-health-cardio-tracking-died-on-2-july-23-days-of",
  ask: "Your Apple Health cardio tracking died on 2 July — 23 days of activeCalories are missing. Do you want those 23 days backfilled, or should we just resume from today once the phone side is reconnected?",
  askedBy: "athena",
  askedIn: "019f82df-de24-732c-9b7d-1d53ed2c2607",
  status: "answered",
  offered: [
    "Backfill all 23 days",
    "Resume from today, skip the backfill",
    "Backfill only if it turns out cheap",
  ],
  answer: "Backfill all 23 days",
  closedAt: "2026-07-25T09:33:30.960Z",
  context: "txt",
} as const satisfies Question
