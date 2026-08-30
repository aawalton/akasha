import type { Module } from "../../code-system/module/module.page-type.ts"

export const committing = {
  id: "01a0501a-b83f-7707-afd1-d497b00b4868",
  pageTypeSlug: "module",
  slug: "committing",
  definition: "the commit a landing makes, and the proof that it carries the change",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A commit answered for a change is a commit carrying that change.",
    },
    {
      invariantKind: "departure",
      statement: "What a commit carries is read from its tree, never from a diff.",
    },
    {
      invariantKind: "departure",
      statement: "A path that could not be staged refuses the change.",
    },
    {
      invariantKind: "departure",
      statement:
        "Staging is allowed to fail only where the path does not stand on disk, which is a removal of what git never knew.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change asking for what already stands commits nothing, and answers as nothing rather than as a commit.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here judges, writes or indexes. A caller has written what it asked for before this is reached, and puts it back itself where this throws.",
    },
  ],
} as const satisfies Module
