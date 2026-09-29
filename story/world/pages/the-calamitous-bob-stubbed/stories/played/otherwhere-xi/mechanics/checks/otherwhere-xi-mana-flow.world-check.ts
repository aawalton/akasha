import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereXiManaFlow = {
  id: "01a0ea86-3268-7278-bfd2-d1efb22989a6",
  type: "page-type/world-check",
  slug: "otherwhere-xi-mana-flow",
  title: "Mana Flow",
  world: "world/the-calamitous-bob-stubbed",
  definition: "what a turn's castings cost a character in Otherwhere XI, and how hard each is",
  description: "What casting a spell takes out of someone.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every spell, circle or ward she casts in a turn is settled here, once, in order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Below three percent attunement no one casts at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A casting is sized: a flare, small, moderate, large or great.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A flare costs 1, small 3, moderate 8, large 20 and great 50 mana.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A flare is a greeting or a light; small a spark or push; moderate a bolt or wall of hands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A large casting is a war mage's blast; a great one breaks walls.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each rune past the first costs two more, and makes the casting one band harder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "She holds one rune in mind, and one more for each full ten of Focus past ten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A spell in the color she leans to costs a quarter less; colorless work costs half again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A small spell strikes light, moderate solid, large heavy and great savage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whether the casting takes shape is her act, settled by the action check at the band given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A casting that fails still spends its mana.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spell learned and cast often may become a skill, as the growth check says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mana left is written on her mana page before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"character":"...","mana":9,"attunement":3.2,"focus":17,"castings":[...]}`.',
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No mana cost or band appears in the prose.",
    },
  ],
} as const satisfies WorldCheck
