import type { Module } from "@akasha/code-system/module"

export const turnWorking = {
  id: "01a0687b-3c85-7000-b60f-9d7b8c037697",
  pageTypeSlug: "module",
  slug: "turn-working",
  definition: "whether a seat is part way through a turn or having its context compacted",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat is working where any one of its working components is on.",
    },
    {
      invariantKind: "departure",
      statement: "Unread is not off, and the two are told apart.",
    },
    {
      invariantKind: "departure",
      statement: "A component akasha declares no property for is unread rather than off.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes a seat's page.",
    },
  ],
} as const satisfies Module
