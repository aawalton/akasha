import type { Question } from "../question.page-type.ts"

export const doesThe19104CommentSweepBranchMergeToMain = {
  id: "01a00105-5fa7-7f62-b035-330ab840b022",
  pageTypeSlug: "question",
  slug: "does-the-19104-comment-sweep-branch-merge-to-main",
  ask: "Does the #19104 comment-sweep branch merge to main?",
  askedBy: "thea",
  askedIn: "019fecd1-154c-7a14-95d3-fc01e97fcb46",
  status: "answered",
  offered: [
    "Merge it to main",
    "Hold it, I want to look first",
    "Land it in parts rather than one merge",
  ],
  answer: "yes, then lets update the command",
  closedAt: "2026-08-14T16:28:22.578Z",
  context: "txt",
} as const satisfies Question
