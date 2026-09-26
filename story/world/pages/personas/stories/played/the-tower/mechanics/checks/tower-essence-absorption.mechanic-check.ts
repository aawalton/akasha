import type { MechanicCheck } from "akasha/story/mechanic/check/mechanic-check.page-type.types.ts"

export const towerEssenceAbsorption = {
  id: "01a0de20-3461-7a2b-9942-98703bce450d",
  type: "page-type/mechanic-check",
  slug: "tower-essence-absorption",
  title: "Essence Absorption",
  definition:
    "how cleanly an essence seed in the Tower is absorbed, and what that absorption costs",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An absorption is the absorber's mental attack held against fifty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An absorption always takes, so no roll refuses one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The margin says how clean an absorption is rather than whether it happened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A margin of eight or more is clean, nought to seven adequate, and under nought rough.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clean absorption costs nine mana and carries no backlash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An adequate absorption costs eighteen mana and two fifths of the backlash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rough absorption costs thirty mana and the element's backlash whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a rough absorption leaves the element's lingering mark.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An absorber holding neither a relevant skill nor any attunement is trained none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An absorber holding a relevant skill or any attunement at all is trained three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An absorber attuned to the element is trained six, and one more per rank above the first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Absorbing an element the absorber is not attuned to opens that element at its first rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seed is consumed by any absorption, and what was drawn out leaves it inert.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading names the element and the rank by the Tower's pages for them.",
    },
  ],
} as const satisfies MechanicCheck
