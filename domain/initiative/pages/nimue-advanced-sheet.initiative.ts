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
        "Each reading carries the advanced sheet; dodge cost has a formula as stamina-dodge-cost. Sneak cost misses by one where Vesture of Darloc Brae is worn: Darloc alone reads 98, Temper 99. The game's bonus text gives Darloc 10%, Temper's set page 25%. No developer-plausible form fits all 1780 sneak readings yet: Darloc at 10% needs a second reduction of 17% to 24.5%, and the only round fit adds 1% to the Medium Armor Bonuses step.",
    },
  ],
  constraints: [
    "A stat is fitted from readings already landed before any capture is asked of Alan.",
    "A stat that reads another is worked after the stat it reads.",
  ],
  createdAt: "2026-10-21T01:19:57.827Z",
  updatedAt: "2026-10-21T13:13:35.966Z",
} as const satisfies Initiative
