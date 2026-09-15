import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const statusBarSlotTypes = {
  id: "01a0655b-ae42-766d-a390-829beb9775ea",
  type: "module",
  slug: "status-bar-slot-types",
  definition: "the kinds of thing the status bar draws in a slot",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A slot is a workstation figure, a usage figure, a separator, or a stoplight section.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slot states which of the four kinds the slot is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every slot names the key the editor has the slot's item under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every slot says where the slot is drawn among the other slots.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A usage slot has the reading the slot takes out of one whole usage answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The stoplight sections are named here and nowhere else.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here is a slot.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A workstation slot has the reading the slot takes out of one whole workstation answer.",
    },
  ],
} as const satisfies Module
