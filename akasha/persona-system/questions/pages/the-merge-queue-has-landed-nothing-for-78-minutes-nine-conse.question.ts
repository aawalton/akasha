import type { Question } from "../question.page-type.ts"

export const theMergeQueueHasLandedNothingFor78MinutesNineConse = {
  id: "019f9afb-f987-7926-a6e3-39d33806d55a",
  pageTypeSlug: "question",
  slug: "the-merge-queue-has-landed-nothing-for-78-minutes-nine-conse",
  ask: "The merge queue has landed NOTHING for 78 minutes — nine consecutive failed batches. The fixes for it are queued behind it, and dispatching the root-cause row needs your capacity gate lifted. How do you want me to break it?",
  askedBy: "dalla",
  askedIn: "019f9a38-03a1-73f4-b252-5fb1a3b46440",
  status: "answered",
  offered: [
    "Dispatch 16278 past the gate",
    "Pause the merge queue to stop the waste",
    "Keep waiting, it is stochastic",
    "Wake me, this needs a call",
  ],
  answer: "Dispatch 16278 past the gate",
  closedAt: "2026-07-25T20:34:08.458Z",
  context: "txt",
} as const satisfies Question
