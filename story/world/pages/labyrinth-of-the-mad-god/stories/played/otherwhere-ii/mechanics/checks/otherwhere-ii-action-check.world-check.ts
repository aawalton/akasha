import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereIiActionCheck = {
  id: "01a0e990-b58d-79aa-a179-1b7000226703",
  type: "page-type/world-check",
  slug: "otherwhere-ii-action-check",
  title: "Action Check",
  world: "world/labyrinth-of-the-mad-god",
  definition: "whether an act Nala or another character tries comes off, and how well",
  description: "The test of whether something tried comes off, and how well.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only an act whose outcome is in doubt and matters is checked; the rest is told.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act is one twenty-sided die plus its attribute, its skill and its bonuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An easy act's target is 8, a standard act's 12, a hard act's 16, an extreme act's 20.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The band is set by the act and by what opposes it, before the die is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attribute adds half its lead over six, rounded down, from minus four to four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill adds one for every five of its levels, at most four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A named bonus names what it comes from and runs from minus four to four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act's named bonuses add to at most six either way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Thirst, hunger, heat, pain, dark and a body not yet familiar are named bonuses against her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act clearing its target by five or more comes off strongly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act meeting its target comes off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act short of its target by four or less comes off at a real cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act short of its target by five or more fails, and the situation worsens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A natural twenty comes off strongly and a natural one fails, whatever the margin.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Dice, bands and margins never appear in the prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person's most mana is three times their Magic.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spell spends the mana its page states, whether it works or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No one spends mana they lack; an empty core leaves a dull ache below the heart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Mana comes back as many an hour as half the character's Magic, and whole with sleep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in mana is written on the page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person's most stamina is five and their Strength, Dexterity and Toughness.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A hard sprint, climb, swim or fight costs two stamina a turn, and a long walk one an hour.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At nought stamina every act takes a named bonus of minus three until she rests.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Stamina comes back four an hour at rest, faster with food and water, and whole with sleep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A combat art spends stamina as its page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in stamina is written on the page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Strength is the stat for lifting, pulling, climbing and the force behind a blow.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Dexterity is the stat for speed, balance, dodging, aim and fine work with the hands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Toughness is the stat for enduring blows, heat, cold, poison and long effort.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Mind is the stat for reasoning, memory, noticing and foreseeing how things move.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Creativity is the stat for picturing, invention and shaping a spell in the mind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Charisma is the stat for winning trust, leading, and calming or cowing a beast.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Magic is the stat for a spell's power, the core's size and how fast mana returns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stat page holds the stat's total, with every trait and point the character has.",
    },
  ],
} as const satisfies WorldCheck
