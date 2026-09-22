import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudSceneFragments = {
  id: "01a060a4-fa3b-7a5a-9dbd-b12ae75da9e4",
  type: "page-type/module",
  slug: "hud-scene-fragments",
  definition: "the HUD parts a scene adds for itself",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A part here belongs to the one scene adding the part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part here is hidden by the scene rather than by the fragment group.",
    },
  ],
} as const satisfies Module
