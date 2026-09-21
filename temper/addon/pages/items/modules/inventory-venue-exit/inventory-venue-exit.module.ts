import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryVenueExit = {
  id: "01a0cc42-6b1f-7a05-9d38-4e7b21c6f9a0",
  type: "page-type/module",
  slug: "inventory-venue-exit",
  definition: "the venue window closed once nothing the addon started there is still working",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A venue is closed only where the run is at the step that venue belongs to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each job that can outlast the opening is asked whether it is still working.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A question still on the screen counts as work still going.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A venue the player closed first is left alone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides how long a venue is held.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Which interaction each venue is is written here rather than read from the game.",
    },
  ],
} as const satisfies Module
