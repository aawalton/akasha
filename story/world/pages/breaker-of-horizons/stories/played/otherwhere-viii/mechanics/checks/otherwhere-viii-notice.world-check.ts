import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereViiiNotice = {
  id: "01a0ea40-05a4-7018-a63d-078b96c8a59c",
  type: "page-type/world-check",
  slug: "otherwhere-viii-notice",
  title: "Notice",
  world: "world/breaker-of-horizons",
  definition: "how much attention a character in Otherwhere VIII has drawn after one turn",
  description: "How much attention Nala has drawn.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Notice is how far the watchers of the Empire have turned toward her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Notice runs from nought to a hundred, kept on her notice page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Notice is settled once a turn that marked her or ended a quiet week, with no dice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each mark names what it comes from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An odd deed seen in public marks one, and a police record or a questioning two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An arcanist looking at her closely marks three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Entering a Spire, or its augera stirring, marks five.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Dealings with the Academy's people mark eight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Notice falls one for each quiet week.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At ten the police hold a file on her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At twenty-five the Empire's quiet agents ask about her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "At fifty the Demiurge hears of her, and at seventy-five a Fateweaver looks her way.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Notice is never shown and never named in the prose.",
    },
  ],
} as const satisfies WorldCheck
