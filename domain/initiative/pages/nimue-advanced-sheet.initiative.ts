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
        "`akasha temper stat-compare` sets each sheet row beside Temper's. Bash damage misses on most readings, 1 to 222 high. Dodge cost misses on Yvlon, Belavierr and Mrsha; sprint cost on Nirayicel and Erin; bash cost, block cost and block move speed on Amerys and Khelta; healing taken on Khelta. Sneak cost is 1 high with Vesture of Darloc Brae, whose bonus text says 10%: no plausible form fits, and Darloc at 10% needs a second 17% to 24.5% reduction.",
    },
  ],
  constraints: [
    "A stat is fitted from readings already landed before any capture is asked of Alan.",
    "A stat that reads another is worked after the stat it reads.",
  ],
  createdAt: "2026-10-21T01:19:57.827Z",
  updatedAt: "2026-10-21T14:18:24.951Z",
} as const satisfies Initiative
