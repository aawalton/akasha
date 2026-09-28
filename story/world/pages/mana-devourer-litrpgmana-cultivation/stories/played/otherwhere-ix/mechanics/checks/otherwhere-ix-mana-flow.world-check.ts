import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereIxManaFlow = {
  id: "01a0ea44-2cd7-7f63-a28a-88faefce1b83",
  type: "page-type/world-check",
  slug: "otherwhere-ix-mana-flow",
  title: "Mana Flow",
  world: "world/mana-devourer-litrpgmana-cultivation",
  definition: "the mana a character in Otherwhere IX spends, takes in and regains in one turn",
  description: "How much mana someone holds after a turn.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Mana is settled once a turn for each character who spent, took in or rested it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill or spell spends what its own page's mana cost says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body regains half its Spirit in mana each waking hour, and twice that asleep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Mana taken in comes from a swallowed Essence Stone, a core, a potion or a mage's gift.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala's body holds no more than its most mana, like most bodies on Firrelia.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Mana taken past her most burns off, dealing half the burned mana as harm.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mana she has is written on her mana page before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice, and no mana shows as a number but in a system box.",
    },
  ],
} as const satisfies WorldCheck
