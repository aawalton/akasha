import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const markersMapPins = {
  id: "01a0de85-2b4b-778c-b1e4-3b68645b45af",
  type: "page-type/module",
  slug: "markers-map-pins",
  definition: "the loaded markers shown as pins on the world map",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pins are drawn by this add-on's own map pin library rather than LibMapPins.",
    },
  ],
} as const satisfies Module
