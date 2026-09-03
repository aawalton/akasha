import type { Question } from "../question.page-type.ts"

export const warmTapTestKeepTheAppOpenInTheForegroundThenTapT = {
  id: "019f68be-5259-74a3-9432-ca6e6ed53f24",
  pageTypeSlug: "question",
  slug: "warm-tap-test-keep-the-app-open-in-the-foreground-then-tap-t",
  ask: "Warm-tap test: keep the app OPEN in the foreground, then tap this notification from the banner. Chat or properties? (Cold tap gave properties; fresh nav gives chat — a warm tap landing on chat pins the bug to a navigator.onLine race at app resume.)",
  askedBy: "athena",
  askedIn: "019f3c82-e54b-7d9f-a0a0-b4d376196141",
  status: "answered",
} as const satisfies Question
