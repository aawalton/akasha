import type { Module } from "@akasha/code-system/module"

export const lockHolderRuns = {
  id: "01a068ae-fd9b-7000-b173-e42fd71f9bab",
  pageTypeSlug: "module",
  slug: "lock-holder-runs",
  definition:
    "whether the process a lock file names is alive, read from the bare pid the file holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A lock file that will not read names no live holder.",
    },
    {
      invariantKind: "departure",
      statement: "A lock file holding anything but one positive whole number names no live holder.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pid the caller may not signal is alive, because only ESRCH says the process is gone.",
    },
    {
      invariantKind: "departure",
      statement:
        "The mark read here is the bare pid, which is not the pid-and-start-tick mark the akasha landing lock writes.",
    },
  ],
} as const satisfies Module
