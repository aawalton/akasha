import type { Module } from "@akasha/code-system/module"

export const localCutLock = {
  id: "01a05cee-e560-799d-8874-d6c9518059c9",
  pageTypeSlug: "module",
  slug: "local-cut-lock",
  definition: "the workstation file lock a testflight cut holds while it runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The mac build mutex engages only after script delivery.",
    },
    {
      invariantKind: "departure",
      statement: "The lock sits at a fixed path in the home directory rather than in a repo.",
    },
    {
      invariantKind: "departure",
      statement: "A lock whose holder is no longer alive is stolen rather than waited on.",
    },
    {
      invariantKind: "departure",
      statement: "A lock file that will not parse raises rather than being stolen.",
    },
    {
      invariantKind: "departure",
      statement: "The lock is released only by the process whose pid the file names.",
    },
  ],
} as const satisfies Module
