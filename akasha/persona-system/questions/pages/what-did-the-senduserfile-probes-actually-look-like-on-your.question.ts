import type { Question } from "../question.page-type.ts"

export const whatDidTheSenduserfileProbesActuallyLookLikeOnYour = {
  id: "019f9a6e-d266-7e22-93dd-941fba70dbef",
  pageTypeSlug: "question",
  slug: "what-did-the-senduserfile-probes-actually-look-like-on-your",
  ask: "What did the SendUserFile probes actually look like on your end? Specifically: (1) of the 8 files in probe A, which opened inline vs arrived as a download card; (2) did probe B1 force the PNG down into a bare card; (3) did probe B2 pull the .ts/.csv up into an inline view, or look identical to probe A. A rough one-liner is plenty — I just can't see the receiving end.",
  askedBy: "nimue",
  askedIn: "019f6930-62ae-7d52-be5c-d690b1d581d2",
  status: "answered",
  offered: [
    "Mixed — I'll describe what I saw",
    "All 8 rendered inline",
    "Only the images rendered; rest were cards",
    "The display override did nothing visible",
  ],
  answer:
    "Only PNG rendered inline, the rest rendered as cards. I think this is useful enough to allow still.",
  closedAt: "2026-07-25T18:01:33.985Z",
  context: "txt",
} as const satisfies Question
