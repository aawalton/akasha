import type { Module } from "@akasha/code-system/module"

export const readoutNoneLeft = {
  id: "01a05b88-a4a3-76a2-abf1-db8351d2a5b7",
  pageTypeSlug: "module",
  slug: "readout-none-left",
  definition: "the words and emoji a readout page states for when nothing is left",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each half is carried only where the page states that half.",
    },
    {
      invariantKind: "departure",
      statement: "A half stating nothing but spaces is no half.",
    },
    {
      invariantKind: "departure",
      statement: "A half is carried with the spaces around the half trimmed off.",
    },
    {
      invariantKind: "departure",
      statement: "A readout no page names carries neither half.",
    },
    {
      invariantKind: "departure",
      statement: "A store that answers nothing carries neither half.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides when nothing is left.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here draws a ring.",
    },
  ],
} as const satisfies Module
