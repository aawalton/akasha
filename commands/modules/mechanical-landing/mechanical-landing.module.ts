import type { Module } from "@akasha/code/module"

export const mechanicalLanding = {
  id: "01a081c9-a23f-7966-b087-421c58e918f3",
  pageTypeSlug: "module",
  type: "module",
  slug: "mechanical-landing",
  definition: "a change a program lands, judged by no check and owing no reading",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A landing here is made by a program rather than by an agent.",
    },
    {
      invariantKind: "departure",
      statement: "A program landing a change is handed the caller a program lands through.",
    },
    {
      invariantKind: "departure",
      statement: "A landing here runs no check and writes nothing into the commit about that.",
    },
    {
      invariantKind: "departure",
      statement: "A change here is landed rather than drafted.",
    },
    {
      invariantKind: "departure",
      statement: "A landing here has no writer, so no reading is owed for what it writes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here breaks the glass.",
    },
    {
      invariantKind: "departure",
      statement:
        "A landing here states the commit that landing read, so a path moved in between is refused.",
    },
  ],
} as const satisfies Module
