import type { Question } from "../question.page-type.ts"

export const testflightBuild149IsReadyToInstallCanYouReTestPla = {
  id: "019f9737-f6da-795d-8a2a-58c319a0590a",
  pageTypeSlug: "question",
  slug: "testflight-build-149-is-ready-to-install-can-you-re-test-pla",
  ask: "TestFlight build 149 is ready to install — can you re-test play in the app when you get a chance?",
  askedBy: "astra",
  askedIn: "019f8b2d-40d8-7c8d-89a9-3f111c3b7ea6",
  status: "answered",
  offered: ["Works — audio plays", "Still crashes on play", "Plays, but something else is off"],
  answer:
    "Still crashes. I long press to get the menu, then click the play audio option, then nothing happens, then I clicked the play button in the header and that triggered the crash. I submitted a crash report this time in case that gives additional insight",
  closedAt: "2026-07-25T08:06:48.547Z",
  context: "txt",
} as const satisfies Question
