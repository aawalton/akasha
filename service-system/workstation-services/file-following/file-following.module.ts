import type { Module } from "@akasha/code-system/module"

export const fileFollowing = {
  id: "01a05a5e-4f46-76e6-8f54-5318900f7d74",
  pageTypeSlug: "module",
  slug: "file-following",
  definition: "which files of a set have changed, and word as soon as one does",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A file is weighed by a hash of its bytes rather than by when the file was last touched.",
    },
    {
      invariantKind: "departure",
      statement: "The folder holding a file is watched rather than the file.",
    },
    {
      invariantKind: "departure",
      statement: "A file that is gone has changed.",
    },
    {
      invariantKind: "departure",
      statement: "A file that comes back has changed again.",
    },
    {
      invariantKind: "departure",
      statement: "A file dropped from the set has changed.",
    },
    {
      invariantKind: "departure",
      statement: "Word comes once for a burst of changes rather than once for every change.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change landing before the watch is set up is caught where a weighing is handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A folder that cannot be watched is reported and the rest are watched.",
    },
    {
      invariantKind: "departure",
      statement: "Following a named set weighs that set alone.",
    },
    {
      invariantKind: "departure",
      statement: "A file appearing beside a named set is no part of that set and is not answered.",
    },
    {
      invariantKind: "departure",
      statement:
        "Following a folder weighs the files that folder holds now rather than a list fixed at the start.",
    },
    {
      invariantKind: "departure",
      statement: "A file appearing in a followed folder has changed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out which folders to watch.",
    },
  ],
} as const satisfies Module
