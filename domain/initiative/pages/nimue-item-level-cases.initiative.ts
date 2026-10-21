import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueItemLevelCases = {
  id: "01a159e7-abf3-7fdd-b491-f78939cb4cfd",
  type: "page-type/initiative",
  slug: "nimue-item-level-cases",
  domain: "domain/temper-characters-equipment",
  persona: "persona/nimue",
  parent: "initiative/nimue-correct-formulas",
  intentStack: [
    {
      statement:
        "Reinforced, Nirnhoned, Invigorating and Well-fitted armor are pinned above normal.",
      workingMemory:
        "Erin's CP160 shield, one quality upgrade per reading. A trait is the same on every armor slot. Each trait is pinned at normal, and no landed reading wears one above normal.",
    },
    {
      statement: "Sturdy is pinned above normal.",
      workingMemory:
        "Sturdy moves block cost, and erin-solstice-normal-sturdy-shield pins it at normal. No landed reading wears Sturdy above normal.",
    },
    {
      statement: "Nirnhoned weapons are pinned above normal, and Infused at each quality.",
      workingMemory:
        "One weapon, one quality upgrade per reading. Nirnhoned is pinned on the normal bow. The normal Infused bow carries an absorb glyph, which moves no sheet stat, so Infused needs a weapon with a sheet-stat glyph.",
    },
    {
      statement: "Protective is pinned at legendary, and Infused jewelry above normal.",
      workingMemory:
        "One ring, one quality upgrade per reading. Protective is pinned normal to epic, and Infused at normal. Legendary Protective is its tooltip's 1190.",
    },
    {
      statement: "Swift jewelry is pinned at each quality.",
      workingMemory:
        "Swift moves sprint speed, which Temper estimates, but one normal Swift ring leaves the shown 142 unmoved.",
    },
  ],
  constraints: [
    "An item tooltip number is never a verified test case.",
    "Tooltip text in a reading may plan a case or suggest a formula and never pins a formula.",
    "Every equipment value is checked against a character-sheet stat change.",
    "Each step changes one thing and reads the stat that change moves.",
    "No piece is upgraded to legendary for a case alone.",
    "A glyph goes only on an item at or above the glyph's minimum item level.",
    "A quality never captured at a level is inferred from the captured qualities' sequence, where it matches the legendary pieces captured.",
  ],
  createdAt: "2026-10-20T15:21:57.490Z",
  updatedAt: "2026-10-21T15:37:05.030Z",
} as const satisfies Initiative
