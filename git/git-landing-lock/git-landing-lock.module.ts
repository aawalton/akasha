import type { Module } from "@akasha/code-system/module"

export const gitLandingLock = {
  id: "01a068ae-fd9c-7000-b1a4-27f1d42e2a33",
  pageTypeSlug: "module",
  slug: "git-landing-lock",
  definition:
    "one landing at a time in a checkout, serialised on a lock file beside the git common directory",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A root that is no git checkout takes no lock and lands nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A lock whose holder is no longer alive is cleared and taken.",
    },
    {
      invariantKind: "departure",
      statement:
        "A lock a live holder keeps past the ceiling refuses the landing rather than waiting on.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal says plainly that nothing was written, unlinked or committed.",
    },
    {
      invariantKind: "departure",
      statement: "The lock is released only where the file still names this process.",
    },
    {
      invariantKind: "departure",
      statement: "This lock is not the akasha landing lock, and neither excludes the other.",
    },
  ],
} as const satisfies Module
