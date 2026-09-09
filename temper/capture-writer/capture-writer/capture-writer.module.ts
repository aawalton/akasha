import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const captureWriter = {
  id: "01a060b5-5ba9-7490-bcc8-208680a38a27",
  pageTypeSlug: "module",
  slug: "capture-writer",
  definition: "one descriptor turned into an add-on that saves what it captured",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The saved table is made up once the game says the add-on has loaded.",
    },
    {
      invariantKind: "departure",
      statement: "The caller's own setup runs after the saved table is made up.",
    },
    {
      invariantKind: "departure",
      statement: "A load time is measured only where the descriptor asks for a load time.",
    },
    {
      invariantKind: "departure",
      statement: "A measured load time is kept in the saved table beside the capture.",
    },
  ],
} as const satisfies Module
