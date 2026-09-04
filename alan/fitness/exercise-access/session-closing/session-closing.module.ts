import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const sessionClosing = {
  id: "01a0685d-cca7-779e-ae3b-580f6d94c54a",
  pageTypeSlug: "module",
  slug: "session-closing",
  definition:
    "which sessions were left open on a day before today, and the instant each one closes at",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A session states no close while it is open.",
    },
    {
      invariantKind: "departure",
      statement: "A session open on a day before today was abandoned rather than left running.",
    },
    {
      invariantKind: "departure",
      statement:
        "A session abandoned closes at its last set, and at its start where no set states a time.",
    },
    {
      invariantKind: "departure",
      statement:
        "A session stating neither a last set nor a start is left open rather than closed at a guess.",
    },
    {
      invariantKind: "gap",
      statement:
        "A set states no time it was logged, so every close falls back to the session's start.",
    },
    {
      invariantKind: "gap",
      statement:
        "Nothing here writes a close back, because the on-workstation write of a page file is the service's.",
    },
  ],
} as const satisfies Module
