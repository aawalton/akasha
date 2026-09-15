import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const voiceSpec = {
  id: "01a05b70-a58d-78db-84fb-024bfd2939aa",
  type: "page-type/module",
  slug: "voice-spec",
  definition: "the shape a persona's cloned voice is described by",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A voice cloned from a real speaker runs in lane R and no other lane.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A designed voice has the instruction the designed voice was designed by.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every path a spec names is relative to the repo.",
    },
  ],
} as const satisfies Module
