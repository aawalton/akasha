import type { Module } from "../../code-system/modules/module.page-type.ts"

export const mountainDay = {
  id: "01a05c77-31e7-7659-86c4-340d070e0baf",
  pageTypeSlug: "module",
  slug: "mountain-day",
  definition: "the day an instant falls on for someone living on a Denver clock",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A morning day starts at six in the morning.",
    },
    {
      invariantKind: "departure",
      statement: "An evening day turns at six in the evening rather than at midnight.",
    },
    {
      invariantKind: "departure",
      statement: "A day ends at the next midnight on the wall rather than a fixed span later.",
    },
  ],
} as const satisfies Module
