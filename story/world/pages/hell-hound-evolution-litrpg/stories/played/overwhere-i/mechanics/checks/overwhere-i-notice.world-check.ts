import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereINotice = {
  id: "01a0ed27-cca3-70b9-904d-5c8b7ef6d0e5",
  type: "page-type/world-check",
  slug: "overwhere-i-notice",
  title: "Notice",
  world: "world/hell-hound-evolution-litrpg",
  definition: "how far a turn's deeds spread word of Nala through each circle in Overwhere I",
  description: "How far word of her has spread, and who has taken note.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Notice is settled with no dice, once a turn, for each circle her deeds reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The near circles are her village, the march around it, and the kingdom.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The far powers are the Verdant Empire, the Umarii and their Oracle, and the Iron March.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each circle's notice runs from nought to five, and starts at nought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Being seen using open power raises a circle's notice one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spectacle of power many witness raises it two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Word carried onward by travellers, traders or survivors raises the next circle one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A season with no open display lowers a circle one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Power used unseen, or with every witness dead or silent, raises nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Notice of three in a circle draws someone of that circle to look for her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Notice of five in a far power draws that power's agents to her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Who comes, and what they want, is the circle's own choice, as its lore shows it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The new notice is written on the circle's page for her before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Settled by `akasha story settle --story overwhere-i --check overwhere-i-notice`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"character":"character-player/overwhere-i-nala","circles":[{"value":0,...}]}`.',
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deed's kind is seen-using-power, spectacle, word-carried or quiet-season.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No notice shows as a number; only who comes looking shows it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice page's slug ends in the circle it measures.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The circles are village, march, kingdom, verdant-empire, umarii and iron-march.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every circle's page is filed from her first day, at nought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Notice is not favour: those who come looking may come for their own ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in notice is written on its page and a line of its history before the turn moves on.",
    },
  ],
} as const satisfies WorldCheck
