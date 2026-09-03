import type { Module } from "@akasha/code-system/module"

export const seatAkashaHistory = {
  id: "01a06949-b281-7b6f-900b-fa221e76dbd9",
  pageTypeSlug: "module",
  slug: "seat-akasha-history",
  definition: "what a seat last said, read back out of git after its page in akasha is gone",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat is read from the newest commit that wrote its page.",
    },
    {
      invariantKind: "departure",
      statement: "A commit that removed a seat page is left out.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's moment is the time of the commit that wrote it.",
    },
    {
      invariantKind: "departure",
      statement: "Values come back under the key names the old page carried.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not load leaves that seat out of the answer.",
    },
    {
      invariantKind: "departure",
      statement: "The history is read once for a root and held until it is dropped.",
    },
  ],
} as const satisfies Module
