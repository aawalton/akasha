import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const minimapAnimations = {
  id: "01a06269-2b17-76b4-a6e1-d7eb1d3b209f",
  type: "page-type/eso-interface",
  slug: "minimap-animations",
  definition: "the animation with which the minimap window resizes and moves",
  markup: "xml",
  loadedAs: "TemperWorld_Controls.xml",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The document has an animation timeline and no control.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "The Lua bundle reaches the timeline by name.",
    },
  ],
} as const satisfies EsoInterface
