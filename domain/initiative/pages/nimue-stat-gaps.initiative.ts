import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueStatGaps = {
  id: "01a15a8a-ebf0-7bd1-9b5f-3661efb968a8",
  type: "page-type/initiative",
  slug: "nimue-stat-gaps",
  domain: "domain/temper",
  persona: "persona/nimue",
  parent: "initiative/nimue-correct-formulas",
  intentStack: [
    {
      statement: "Prodigy's critical rating reproduces every Valeterisa reading.",
      workingMemory:
        "Valeterisa misses critical rating on most readings, usually by 3 or 4. The constant fits 219.667 to under 219.75, floored. The four-light reading of 878 rules out 219.75.",
    },
    {
      statement: "An off-hand weapon's power reproduces every Three-Color Stalker reading.",
      workingMemory:
        "The off-hand adds about 0.237 of its power. Dual Wield Expert is unplaced in that rule.",
    },
    {
      statement: "A set worn at mixed qualities reproduces every reading wearing it.",
      workingMemory:
        "Khelta's Plague Doctor at fine and epic misses Max Health. Mrsha's Darloc Brae gives 123 Max Magicka, unexplained. Erin's mixed-quality bow with one armor piece, and the mixed level-and-quality cases, are held out to check the fitted rule.",
    },
    {
      statement: "Mighty Chudan's armor reproduces every Durene reading.",
      workingMemory: "Durene misses Armor by one point on 7 readings, all wearing Mighty Chudan.",
    },
    {
      statement: "Every recovery reading on Mrsha and Valeterisa reproduces.",
      workingMemory:
        "Mrsha misses Magicka and Stamina Recovery on 4 readings each, and Valeterisa misses a few Health, Magicka and Stamina Recovery readings.",
    },
    {
      statement: "Max Health, Magicka and Stamina reproduce every Khelta and Amerys reading.",
      workingMemory:
        "Khelta misses Max Health on 20 readings, Magicka on 7 and Stamina on 7. Amerys misses Max Health on 13, Magicka on 10 and Stamina on 11. Mixed-quality sets explain part of this.",
    },
    {
      statement: "Triune, Protective, Well-fitted and Divines each have a pinned value.",
      workingMemory:
        "Protective readings disagree, 1053 against 1624. Triune's health is unfitted. Well-fitted reads only dodge cost. Divines reads through the mundus stone.",
    },
    {
      statement: "Impenetrable is pinned at epic and legendary.",
      workingMemory:
        "Impenetrable is 121, 124 and 127 at normal, fine and superior. Epic and legendary are inferred from that sequence.",
    },
  ],
  constraints: [
    "A gap is worked by its own subagent, beside the other gaps.",
    "A gap is closed only when every reading it named reproduces exactly.",
    "A reading a gap needs is asked of Alan once its own fit has used every reading already landed.",
  ],
  createdAt: "2026-10-20T18:20:16.239Z",
  updatedAt: "2026-10-20T18:20:16.239Z",
} as const satisfies Initiative
