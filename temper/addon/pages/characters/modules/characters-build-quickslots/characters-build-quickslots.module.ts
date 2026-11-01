import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersBuildQuickslots = {
  id: "01a19947-352b-703a-8b73-b14ed5aa6cd6",
  type: "page-type/module",
  slug: "characters-build-quickslots",
  definition: "reading and setting the quickslot wheel a character's target build holds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A build that holds a wheel holds every slot of it, an empty slot as empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item slot is matched by the item's id, and any stack of that item fills it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item the character has run out of stays in the build and counts as held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wheel is set through the game's protected calls, so never in combat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item the bag does not hold is named rather than set.",
    },
  ],
  createdAt: "2026-11-01T22:42:23.147Z",
  updatedAt: "2026-11-01T22:42:23.147Z",
} as const satisfies Module
