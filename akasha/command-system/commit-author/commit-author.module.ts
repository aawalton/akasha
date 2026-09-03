import type { Module } from "@akasha/code-system/module"

export const commitAuthor = {
  id: "01a068b1-4f80-7000-adc7-64276300358f",
  pageTypeSlug: "module",
  slug: "commit-author",
  definition: "who a commit is authored as, read from the persona the writing seat acts under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A commit no seat is writing is authored as Claude.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat acting under the default persona is authored as Claude, not under that persona.",
    },
    {
      invariantKind: "departure",
      statement:
        "A persona that declares no email address cannot be authored as, so Claude is used.",
    },
    {
      invariantKind: "departure",
      statement:
        "The default persona is read off the seat page type's own declaration rather than out of any index.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subagent declares no persona of its own and is answered from the seat it was spawned under.",
    },
    {
      invariantKind: "departure",
      statement:
        "Anything thrown while working out the author is answered as Claude rather than raised.",
    },
    {
      invariantKind: "departure",
      statement: "The author is worked out once per process and held.",
    },
  ],
} as const satisfies Module
