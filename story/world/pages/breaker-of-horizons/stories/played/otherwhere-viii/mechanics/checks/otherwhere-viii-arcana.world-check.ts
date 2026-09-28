import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereViiiArcana = {
  id: "01a0ea3d-7faa-7be1-8afe-2c035283babc",
  type: "page-type/world-check",
  slug: "otherwhere-viii-arcana",
  title: "Arcana",
  world: "world/breaker-of-horizons",
  definition: "how much arcana a character in Otherwhere VIII has left after drawing it",
  description: "How much arcana Nala has left to draw.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Arcana is the pool she draws for the Art, kept on her arcana page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Arcana is settled once a turn in which she drew or rested, with no dice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her most arcana starts at six.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her most arcana grows by one at control 3, 8, 15, 25 and 40.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Rest comes before spending.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour of rest adds one, up to her most, and a night's rest fills her to it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Activating an artefact costs her nothing, as the artefact draws ambient arcana.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A glyphless mote or blob costs one, a Minor Query one, and a light orb one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A standard bolt costs two, a small shield three, and a small healing four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A work beyond those costs what its skill page's cost says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Spending may take her below nought, down to twenty below.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At nought or above she is clear.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One or two below is strained: a headache, costing one on acts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Three to five below is overdrawn: nausea and a hollow feeling, costing three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Overdrawn, common artefacts refuse her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Six to eight below is collapsed: she falls unconscious and loses three health.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Past eight below is dying: she loses one health a minute.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Dying lasts until a healer or a vent restores her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Venting, once learned, lifts her one stage after a minute.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The prose shows arcana only as the body feels it, never as a stage or a number.",
    },
  ],
} as const satisfies WorldCheck
