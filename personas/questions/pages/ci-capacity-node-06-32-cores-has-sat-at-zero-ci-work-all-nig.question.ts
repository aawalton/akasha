import type { Question } from "../question.page-type.ts"

export const ciCapacityNode0632CoresHasSatAtZeroCiWorkAllNig = {
  id: "019f9ad7-0248-7f0d-a09a-dc3e406729fe",
  pageTypeSlug: "question",
  slug: "ci-capacity-node-06-32-cores-has-sat-at-zero-ci-work-all-nig",
  ask: "CI capacity: node-06 (32 cores) has sat at ZERO CI work all night while node-05 runs the control plane, the whole worker fleet AND branch CI at 99% CPU with its kube-scheduler failing liveness probes. Throughput is degraded, not blocked. What do you want tonight?",
  askedBy: "dalla",
  askedIn: "019f9a38-03a1-73f4-b252-5fb1a3b46440",
  status: "answered",
  offered: [
    "Open node-06 to branch CI now",
    "Dispatch #16280 now past the gate",
    "Both",
    "Neither, wait for morning",
  ],
  answer: "Open node-06 to branch CI now",
  closedAt: "2026-07-25T19:54:27.502Z",
  context: "txt",
} as const satisfies Question
