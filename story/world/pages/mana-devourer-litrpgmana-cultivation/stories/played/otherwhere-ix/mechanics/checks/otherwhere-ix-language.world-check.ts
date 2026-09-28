import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereIxLanguage = {
  id: "01a0ea40-a798-7456-8bdd-f9c6047f8bbe",
  type: "page-type/world-check",
  slug: "otherwhere-ix-language",
  title: "Language",
  world: "world/mana-devourer-litrpgmana-cultivation",
  definition:
    "how much of a tongue the system does not translate a character in Otherwhere IX learns in one turn",
  description: "How much of a tongue Nala understands and speaks.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nala understands, speaks, reads and writes the region's Common through the system.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her Common fluency is a hundred and never moves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The system does not translate old, obscure, tribal or other-world tongues, nor spell words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Learning such a tongue is settled once a turn for each she heard, spoke or was taught.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Fluency runs from nought to a hundred, on her fluency page for that tongue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour of hearing talk adds a quarter, of speaking a half, of being taught one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Learning slows by half from fifty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill for tongues quickens learning by the share the world builder sets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Below five she has none, to nineteen a few words, to 49 she gets by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "From fifty she is conversant, and from eighty fluent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Asking in a tongue she lacks is extreme; with a few words hard; getting by standard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Speech she does not understand is written as the sounds she hears.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Earth idioms she speaks in Common reach a Firrelian word for word, and puzzle them.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice, and no fluency shows as a number.",
    },
  ],
} as const satisfies WorldCheck
