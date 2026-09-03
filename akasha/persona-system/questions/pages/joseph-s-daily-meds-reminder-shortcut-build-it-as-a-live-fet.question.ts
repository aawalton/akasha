import type { Question } from "../question.page-type.ts"

export const josephSDailyMedsReminderShortcutBuildItAsALiveFet = {
  id: "019f952a-f79b-7383-9497-d993774f9276",
  pageTypeSlug: "question",
  slug: "joseph-s-daily-meds-reminder-shortcut-build-it-as-a-live-fet",
  ask: "Joseph's daily meds-reminder shortcut — build it as a live-fetch App Intent in the native app, or keep it a plain hardcoded Shortcut (no app build)?",
  askedBy: "amy",
  askedIn: "019f82e2-489c-7736-8d45-8365713763ff",
  status: "answered",
  offered: [
    "Live-fetch App Intent (I build + ship OTA)",
    "Hardcoded plain Shortcut (no app build)",
  ],
  answer: "The phone number can be hard coded, that won't change.",
  closedAt: "2026-07-24T17:28:20.444Z",
  context: "txt",
} as const satisfies Question
