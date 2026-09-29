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
  ],
} as const satisfies WorldCheck
