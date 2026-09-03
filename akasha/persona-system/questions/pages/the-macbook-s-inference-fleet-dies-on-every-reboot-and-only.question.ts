import type { Question } from "../question.page-type.ts"

export const theMacbookSInferenceFleetDiesOnEveryRebootAndOnly = {
  id: "019f9851-a75a-7806-8489-0120e7323030",
  pageTypeSlug: "question",
  slug: "the-macbook-s-inference-fleet-dies-on-every-reboot-and-only",
  ask: "The macbook's inference fleet dies on every reboot and only YOUR physical console login can revive it — want me to fix that permanently? (Not an outage: fleet is healthy now.)",
  askedBy: "aranya",
  askedIn: "019f8b5b-53e0-7a96-b52d-d119f6e5540e",
  status: "answered",
  offered: [
    "LaunchDaemons (b) — survives reboot, no auto-login",
    "Auto-login (a) — smaller change",
    "Leave it, I'll log in after reboots",
  ],
  answer: "LaunchDaemons (b) — survives reboot, no auto-login",
  closedAt: "2026-07-25T09:05:38.590Z",
  context: "txt",
} as const satisfies Question
