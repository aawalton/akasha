import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudSceneCatalog = {
  id: "01a060a4-fa3b-751a-8639-e3b67666c6b8",
  type: "page-type/module",
  slug: "hud-scene-catalog",
  definition: "every part of the game's HUD, in the order the reading finds each part",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The catalog has every part the game's HUD fragment group names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The catalog has every part a scene adds for itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The catalog has every part hidden as a control.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The order here is the order the reading gives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One ESO global appears once.",
    },
  ],
} as const satisfies Module
