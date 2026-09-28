import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereVLanguage = {
  id: "01a0e9fd-61ff-716d-ab09-8195d608147b",
  type: "page-type/world-check",
  slug: "otherwhere-v-language",
  title: "Language",
  world: "world/ends-of-magic",
  definition: "how much of a tongue a character in Otherwhere V learns in one turn",
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
      statement: "Nala lands with nought in every tongue of Davrar.",
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
      statement:
        "A Talent or skill for tongues quickens learning by the share the world builder sets.",
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
      statement:
        "A language-teaching spell sets fluency to eighty at once, with a splitting headache.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her Earth-born body may throw off a language spell as it throws off any other.",
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
