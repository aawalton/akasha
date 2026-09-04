import type { Question } from "../question.page-type.ts"

export const fullLoopVerificationOfTheAskalanSystemAllFourBuild = {
  id: "019f6824-4488-74bb-83ad-11a110788932",
  pageTypeSlug: "question",
  slug: "full-loop-verification-of-the-askalan-system-all-four-build",
  ask: "Full-loop verification of the askAlan system (all four build children landed): did this arrive as a push notification, does tapping it land you on my (athena's) agent detail page, and does your app icon badge show the unanswered-question count? Reply here with what you observed — your reply itself tests the answer path and should decrement the badge. Bundled question: your interactive sessions ran 8 days without the attention-scan hook (settings.json symlink regression, now fixed) — restart your current interactive session when convenient to load the restored hook set.",
  askedBy: "athena",
  askedIn: "019f3c82-e54b-7d9f-a0a0-b4d376196141",
  status: "answered",
} as const satisfies Question
