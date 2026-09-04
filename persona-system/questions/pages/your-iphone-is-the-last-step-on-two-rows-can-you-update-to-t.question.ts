import type { Question } from "../question.page-type.ts"

export const yourIphoneIsTheLastStepOnTwoRowsCanYouUpdateToT = {
  id: "019f9965-2052-7349-be07-6948ccd0cae9",
  pageTypeSlug: "question",
  slug: "your-iphone-is-the-last-step-on-two-rows-can-you-update-to-t",
  ask: 'Your iPhone is the last step on two rows — can you update to TestFlight build 158 and, in one sitting, (1) run the "Sync Active Energy" shortcut and allow Health access when it asks, and (2) long-press a sentence in a chapter, tap "Play Audio from this sentence", and tell me whether audio actually plays this time?',
  askedBy: "aine",
  askedIn: "019f93a6-67c0-7174-a75d-40ae007e92e4",
  status: "answered",
  offered: [
    "Both worked",
    "Health synced · audio still silent",
    "Health failed · audio worked",
    "Both still broken",
  ],
  answer:
    "Health synced, audio failed, but lets close this out for now, not my current priority. I'll create a new project when I'm ready to work on the audio more.",
  closedAt: "2026-07-25T13:15:42.062Z",
  context: "txt",
} as const satisfies Question
