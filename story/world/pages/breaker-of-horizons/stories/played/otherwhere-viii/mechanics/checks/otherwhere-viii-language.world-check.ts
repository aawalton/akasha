import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereViiiLanguage = {
  id: "01a0ea41-26a0-7f8c-b4b3-bedc0179fee3",
  type: "page-type/world-check",
  slug: "otherwhere-viii-language",
  title: "Language",
  world: "world/breaker-of-horizons",
  definition: "how much of a tongue a character in Otherwhere VIII learns in one turn",
  description: "How much of a tongue Nala understands and speaks.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Learning is settled once a turn for each tongue she heard, spoke or was taught.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Fluency runs from nought to a hundred, kept on her fluency page for each tongue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala speaks and reads the common tongue as a native, at a hundred.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Sedhahn, the archaic tongue of old texts, and the elven tongue start at nought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour of hearing talk adds a quarter, of speaking a half, of being taught one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Learning slows by half past fifty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Below five she has none, to twenty a few words, to fifty she gets by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "From fifty she is conversant, and from eighty fluent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reading a tongue's script is learned apart, at half the pace, once she gets by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Speech she does not understand is written as the sounds she hears.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "As fluency grows, the prose gives her the words she has learned, and no others.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice, and no fluency shows as a number.",
    },
  ],
} as const satisfies WorldCheck
