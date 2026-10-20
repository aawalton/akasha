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
        "The armor value of every weight at level 1 reproduces each resistance change its piece made.",
      workingMemory:
        "Session 0, no game time. Erin Solstice's level-1 readings give these sheet resistance changes per piece. Medium normal: 59 head, shoulders, legs, feet; 68 chest; 25 waist; 34 hands. Light fine: 87, 100, 37, 50. Heavy superior: 241, 276, 103, 138. Shield: normal 40, fine 100, superior 160. Each is 8.5, 12.5 or 34.5 times the slot multiplier, rounded down. Each weight was seen at one quality only.",
    },
    {
      statement: "A build carries the level of each piece it holds.",
      workingMemory:
        "Session 1, no game time. The build hash holds no item level, so every estimate reads CP160 and no level-1 resistance can pin. The capture writes the level and the codec reads it, beside the glyph subtype.",
    },
    {
      statement: "The armor value of each quality is pinned on one weight at one level.",
      workingMemory:
        "Session 2. One light chest at level 1, then the same chest at each next quality, one swap per reading. Reads the resistance change. Decides whether fine and superior share a scale. The level-1 shields already give fine 100 and superior 160.",
    },
    {
      statement: "The armor value of each weight is pinned at one quality and one level.",
      workingMemory:
        "Session 3. Light, medium and heavy chest of one quality at level 1, one swap per reading. Reads the resistance change.",
    },
    {
      statement: "The armor value is pinned across item levels for one weight and one quality.",
      workingMemory:
        "Session 4. One chest of one weight and quality at each item level, one swap per reading, up to CP160. Reads the resistance change.",
    },
    {
      statement: "The enchant strength is pinned for each glyph at one item level and quality.",
      workingMemory:
        "Session 5. One armor piece with a health glyph of each potency, one swap per reading. Reads the Max Health change. Then the same glyph on the piece at each item level, then at each glyph quality.",
    },
    {
      statement: "Each armor and weapon trait is pinned at each quality.",
      workingMemory:
        "Session 6. One piece, one trait change per reading. Reinforced and nirnhoned read resistance, divines the mundus stat, impenetrable critical resistance, infused the enchant stat. A trait changing no sheet stat waits for a reading that shows one. A trait is the same on every armor slot, so a shield is used for all of them.",
    },
    {
      statement: "Each weapon trait is pinned at each quality.",
      workingMemory:
        "Session 6a. One CP160 normal one-handed weapon, one trait change per reading: sharpened, nirnhoned, infused, charged. A two-handed weapon doubles the value. Precise, defending and powered already have cases.",
    },
    {
      statement: "Each jewelry trait is pinned at each quality.",
      workingMemory:
        "Session 6b. One CP160 normal ring, one trait change per reading: arcane, robust, triune, protective, swift, infused, bloodthirsty. Healthy already has cases.",
    },
    {
      statement: "The weapon power is pinned for each weapon type across quality and level.",
      workingMemory:
        "Session 7. One weapon, one swap per reading. Reads the Weapon Damage and Spell Damage change.",
    },
    {
      statement: "Each set bonus is pinned at each piece count.",
      workingMemory:
        "Session 8. Pieces of one set put on one at a time. Reads the stat each bonus line names. The captured set id and bonus lines plan the case and diagnose a miss.",
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
  updatedAt: "2026-10-20T17:48:32.815Z",
} as const satisfies Initiative
