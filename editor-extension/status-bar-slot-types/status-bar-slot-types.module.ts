import type { Module } from "@akasha/code/module"

export const statusBarSlotTypes = {
  id: "01a0655b-ae42-766d-a390-829beb9775ea",
  pageTypeSlug: "module",
  type: "module",
  slug: "status-bar-slot-types",
  definition: "the kinds of thing the status bar draws in a slot",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A slot is a usage figure or a separator or a stoplight section.",
    },
    {
      invariantKind: "departure",
      statement: "A slot states which of the three kinds the slot is.",
    },
    {
      invariantKind: "departure",
      statement: "Every slot names the key the editor has the slot's item under.",
    },
    {
      invariantKind: "departure",
      statement: "Every slot says where the slot is drawn among the other slots.",
    },
    {
      invariantKind: "departure",
      statement: "A usage slot has the reading the slot takes out of one whole usage answer.",
    },
    {
      invariantKind: "departure",
      statement: "The stoplight sections are named here and nowhere else.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here is a slot.",
    },
  ],
} as const satisfies Module
