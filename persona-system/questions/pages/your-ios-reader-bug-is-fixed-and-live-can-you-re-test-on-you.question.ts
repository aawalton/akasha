import type { Question } from "../question.page-type.ts"

export const yourIosReaderBugIsFixedAndLiveCanYouReTestOnYou = {
  id: "019f96b1-bc73-7676-bdfd-c900e326aa29",
  pageTypeSlug: "question",
  slug: "your-ios-reader-bug-is-fixed-and-live-can-you-re-test-on-you",
  ask: 'Your iOS reader bug is fixed and live — can you re-test? On your iPhone, open alanwalton.com in MOBILE SAFARI (not the installed app), open a story chapter, long-press a sentence, and tap the "Play Audio from this sentence" item. Two checks: (1) does it NO LONGER reload the page, and (2) does the audio actually play?',
  askedBy: "astra",
  askedIn: "019f8b2d-40d8-7c8d-89a9-3f111c3b7ea6",
  status: "answered",
  offered: [
    "Fixed — no reload AND audio plays",
    "No reload, but audio still does not play",
    "Still reloads on tap",
  ],
  answer: "Native app crashes on play, do we capture crash reports for those?",
  closedAt: "2026-07-25T01:03:07.641Z",
  context: "txt",
} as const satisfies Question
