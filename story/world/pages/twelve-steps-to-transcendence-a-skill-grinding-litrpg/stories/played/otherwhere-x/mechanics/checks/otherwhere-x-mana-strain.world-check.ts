import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereXManaStrain = {
  id: "01a0ea83-2a21-7268-949a-cd33355d87f6",
  type: "page-type/world-check",
  slug: "otherwhere-x-mana-strain",
  title: "Mana Strain",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  definition: "the mana a draw in Otherwhere X spends, and the strain of drawing past it",
  description: "How much a working of mana costs, and what pushing past empty does.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Mana is settled once a turn for each character from Tier 1 who worked mana in it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Tier 0 has no mana to draw on, whatever she tries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Most mana is 20 at Tier 1, 60 at Tier 2, 180 at Tier 3, 540 at Tier 4.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each tenth of essence put in the mana path adds three tenths of that base.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill costs the mana its own page states; a raw working what the world builder sets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Spending past empty is overdrawing, paid in strain on the mana muscle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Overdrawing to a quarter of most mana aches, to a half brings a migraine.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Overdrawing to all of it brings a nosebleed, and beyond that she collapses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A migraine harms one per tier, a nosebleed three per tier, a collapse six per tier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Strain costs one to four on every act until she rests.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour of cycling restores a fifth of most mana, and a night's sleep all of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Strain that is rested off leaves the mana muscle stronger: an hour of practice for mana.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mana spent comes off her mana page in the same landing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No mana shows as a number in the prose.",
    },
  ],
} as const satisfies WorldCheck
