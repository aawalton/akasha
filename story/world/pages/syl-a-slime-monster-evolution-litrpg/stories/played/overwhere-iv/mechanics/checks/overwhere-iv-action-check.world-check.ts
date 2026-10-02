import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIvActionCheck = {
  id: "01a0ed24-433b-723e-8a41-90c93ca3f7e7",
  type: "page-type/world-check",
  slug: "overwhere-iv-action-check",
  title: "Action Check",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  definition: "whether a declared act in Overwhere IV comes off, and how well",
  description: "Whether something tried comes off.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only an act whose outcome is in doubt and matters is rolled; the rest is told.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act is one twenty-sided die plus every bonus the act earns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An easy act's target is 8, a standard act's 12, a hard act's 16, an extreme act's 20.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The band is set against Nala as she is, powers and all, before the roll.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her magic against a beast, bandit or monster of her home region is easy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Her magic against a foe near her own level is standard, and ten levels over, hard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her magic against a foe of a tier far past her is extreme.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bonus names what it comes from and runs from minus four to four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Dimension Magic act adds four for her legacy affinity.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill she holds adds one per three levels it has, at most three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clever plan, a fitting tool or help from someone adds one to two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Pain, hunger, an emptied well of mana, haste or ignorance each take one to two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act's bonuses add to at most six either way.",
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
      statement: "An act short of its target by four or less comes off at a cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act short of its target by five or more fails, and the scene worsens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A natural twenty comes off strongly and a natural one fails, whatever the margin.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cost is real: hurt, lost time, noise, mana spent twice, or something broken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spell that fails still spends its mana.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Dice, bands and margins never appear in the prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: 'The reading is `{"band":"easy","bonuses":[{"from":"legacy affinity","by":4}]}`.',
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nala's most mana is 40, five more per racial level past the first, three per Dimension Magic level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spell spends the mana cost its skill page states, once each time it is cast.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spell held open spends its cost again for each span its duration states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rend held open a few heartbeats past its instant spends its cost once more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rend laid ahead of a running foe waits only if held open; else it closes before it arrives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour of rest gives back a fifth of her most mana; a night's sleep all of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Emptied, she aches behind the eyes, and her acts take minus two for an hour.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "She cannot spend mana she does not hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in mana is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Mana never shows as a number; she feels it as warmth running full or thin.",
    },
  ],
} as const satisfies WorldCheck
