import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const dayOpening = {
  id: "01a069c3-a82a-798b-b746-3c9dfa4f21fc",
  pageTypeSlug: "module",
  type: "module",
  slug: "day-opening",
  definition: "which day an instant falls in, counted from the moment Alan's day opens",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The moment a day opened is read from the opening window rather than worked out here.",
    },
    {
      invariantKind: "departure",
      statement: "An instant before its ESO day opened counts to the day before.",
    },
    {
      invariantKind: "departure",
      statement: "An instant at or after the next day's opening counts to the day after.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a sleep block.",
    },
    {
      invariantKind: "departure",
      statement: "A window that refuses and a window that falls back to the ESO day are two calls.",
    },
    {
      invariantKind: "departure",
      statement: "A caller counting a figure a day page stores takes the window that refuses.",
    },
    {
      invariantKind: "gap",
      statement:
        "A day that will not parse answers a window at the epoch to the caller taking the other call.",
    },
  ],
  test: "ts",
} as const satisfies Module
