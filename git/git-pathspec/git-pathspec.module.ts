import type { Module } from "@akasha/code-system/module"

export const gitPathspec = {
  id: "01a068ae-fd9c-7001-ba59-e2b9fc02888f",
  pageTypeSlug: "module",
  slug: "git-pathspec",
  definition:
    "git asked and told about many paths at once, under the ceiling one command line takes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path list under the ceiling goes on the command line unchanged.",
    },
    {
      invariantKind: "departure",
      statement:
        "A writing command over the ceiling passes its paths on stdin, so one command still makes one change.",
    },
    {
      invariantKind: "departure",
      statement:
        "An asking command over the ceiling is asked in batches and the answers are joined.",
    },
    {
      invariantKind: "departure",
      statement: "A batch that fails ends the asking at that batch rather than answering half.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path git holds only in history counts as held, so a path already removed from disk is still named.",
    },
  ],
} as const satisfies Module
