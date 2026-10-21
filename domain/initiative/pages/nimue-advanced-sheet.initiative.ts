import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueAdvancedSheet = {
  id: "01a15c0b-2984-7ce6-8f81-17093731a013",
  type: "page-type/initiative",
  slug: "nimue-advanced-sheet",
  domain: "domain/temper",
  persona: "persona/nimue",
  parent: "initiative/nimue-correct-formulas",
  intentStack: [
    {
      statement:
        "Every stat on the game's advanced sheet has a formula that reproduces every landed reading.",
      workingMemory:
        "Each reading carries the advanced sheet: costs for block, sprint, bash, break free and sneak; critical damage and healing; healing done and taken; damage bonuses by element; block mitigation and speeds. Dodge cost has a formula, as the stamina-dodge-cost metric.",
    },
  ],
  constraints: [
    "A stat is fitted from readings already landed before any capture is asked of Alan.",
    "A stat that reads another is worked after the stat it reads.",
  ],
  createdAt: "2026-10-21T01:19:57.827Z",
  updatedAt: "2026-10-21T01:19:57.827Z",
} as const satisfies Initiative
