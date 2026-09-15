import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fileFollowing = {
  id: "01a05a5e-4f46-76e6-8f54-5318900f7d74",
  type: "module",
  slug: "file-following",
  definition: "which files of a set have changed, and word as soon as one does",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file is weighed by a hash of its bytes rather than by when the file was last touched.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder with a file is watched rather than the file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that is gone has changed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that comes back has changed again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file dropped from the set has changed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Word comes once for a burst of changes rather than once for every change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A change landing before the watch is set up is caught where a weighing is handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder that cannot be watched is reported and the rest are watched.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Following a folder weighs the files that folder has now rather than a list fixed at the start.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file appearing in a followed folder has changed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder followed for its events alone is answered without being read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every settled event on such a folder is answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That answer names the folders followed rather than the files that moved.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out which folders to watch.",
    },
  ],
} as const satisfies Module
