import type { Question } from "../question.page-type.ts"

export const theTemperM1InGameAuditCouldLandMuchSoonerViaAnIn = {
  id: "019f9609-cc0b-7843-8d96-155b5d7ca5cb",
  pageTypeSlug: "question",
  slug: "the-temper-m1-in-game-audit-could-land-much-sooner-via-an-in",
  ask: "The Temper M1 in-game audit could land much sooner via an interim on your workstation — it already clears everything the cluster rig is still gated on. The catch: the workstation ESO is on your PRIMARY account, and your policy is expendable-only. Where should the first in-game smoke run?",
  askedBy: "nimue",
  askedIn: "019f6930-62ae-7d52-be5c-d690b1d581d2",
  status: "answered",
  offered: [
    "tempereso on the workstation — policy-clean (expendable), fast; needs a one-time tempereso login from you (my recommendation)",
    "Attended reload-only on your primary — fastest, no login; reload-only is non-gameplay (your tier-3 primary-if-manual); touches the never-primary rule, so only with your explicit nod",
    "Hold for the cluster — fully clean, unattended, off your machine (the durable end-state), but slower",
  ],
  answer:
    "Hold for the cluster, not because of primary account risks (we can log into any account in either place), but because I need to control the workstation, so I can't give over control to the testing agent. The delay is acceptable.",
  closedAt: "2026-07-24T21:32:48.072Z",
  context: "txt",
} as const satisfies Question
