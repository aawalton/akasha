import type { Question } from "../question.page-type.ts"

export const theFullStopWasnTFullyStoppedACiPodLaunchedAndRan = {
  id: "019f9ab0-c871-7ae0-a90a-49136683e8ac",
  pageTypeSlug: "question",
  slug: "the-full-stop-wasn-t-fully-stopped-a-ci-pod-launched-and-ran",
  ask: "The full stop wasn't fully stopped: a CI pod launched and ran 50s AFTER your cancel of pipeline 25909. Do you want this root-caused now, before further restart steps — or filed as a row for the normal queue?",
  askedBy: "aine",
  askedIn: "019f93a6-67c0-7174-a75d-40ae007e92e4",
  status: "answered",
  offered: [
    "Root-cause it now, before more restart steps",
    "File it as a row, work it in the normal queue",
    "Just tell me more first",
  ],
  answer: "delegate an RCA investigation",
  closedAt: "2026-07-25T19:12:21.083Z",
  context: "txt",
} as const satisfies Question
