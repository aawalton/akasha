import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const checkCrossCharacterCraft = {
  id: "01a06137-f964-7c61-843b-2d70fcb4ffe7",
  pageTypeSlug: "module",
  slug: "check-cross-character-craft",
  definition:
    "the condition check over whether any character can research a trait or gain crafting inspiration",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Research and inspiration are answered across every character rather than the current character.",
    },
    {
      invariantKind: "departure",
      statement: "One character below the crafting rank cap makes the whole item inspirable.",
    },
    {
      invariantKind: "departure",
      statement:
        "A trait with no researchable mapping fails the can-research form of the condition.",
    },
    {
      invariantKind: "departure",
      statement:
        "An item with no inferrable crafting type fails the can-inspire form of the condition.",
    },
  ],
} as const satisfies Module
