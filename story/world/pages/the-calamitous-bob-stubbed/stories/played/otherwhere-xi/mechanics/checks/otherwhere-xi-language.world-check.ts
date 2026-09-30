import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereXiLanguage = {
  id: "01a0ea88-1a34-7f90-83cb-9dd7b9f49203",
  type: "page-type/world-check",
  slug: "otherwhere-xi-language",
  title: "Language",
  world: "world/the-calamitous-bob-stubbed",
  definition: "how far time among speakers raises a character's grasp of a tongue in Otherwhere XI",
  description: "How well someone has come to understand a tongue.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Language is settled with no dice, once a turn, for each tongue she has lived among.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Viziman is hers as if born to it, and is never settled here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Below plain talk, each day among speakers who talk with her raises a tongue one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "From plain talk, each week among speakers raises it one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A patient teacher, or a written tongue studied with a key, halves the time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Speech below plain talk is an act: hard from three, extreme below, and none at nought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The new fluency is written on the tongue's page before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"character":"...","tongues":[{"tongue":"old-imperial","fluency":0,"days":1}]}`.',
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No fluency appears as a number in the prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fluency page's slug ends in the tongue or script it measures, nought to ten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala speaks and reads Viziman as one born to it, and needs no page for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Old Imperial, Primal Viziman signs, Paramese Imperial, the northern tongue and Kark are others.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nought is no word; three is single words and signs; six is plain talk; ten is native.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tongue's page is filed at nought when she first meets it spoken or written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in fluency is written on its page and a line of its history before the turn moves on.",
    },
  ],
} as const satisfies WorldCheck
